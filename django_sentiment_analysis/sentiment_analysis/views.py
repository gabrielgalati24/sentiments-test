# Imports de Django
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication

# Imports del proyecto
from authentication.serializers import RegisterSerializer

# Imports de terceros
import requests
import csv
import statistics
from typing import List, Dict, Any, Tuple
from decouple import config
from collections import Counter
import emoji
from utils.stop_words import stop_words
import re
###########################################################################################
# Helper functions.                                                                       #
###########################################################################################

def most_common_words(lst: List[str]) -> List[Tuple[str, int]]:
    # Join all the strings in the list
    text = ' '.join(lst)
    
    # Split the text into words
    words = text.split()
    
    # Remove stop words
    words = [word for word in words if word not in stop_words]
    
    # Count the frequency of each word
    frequency = Counter(words)
    
    # Find the most common words
    most_common = frequency.most_common()
    
    return most_common




def most_common_emojis(lst: List[str]) -> List[Tuple[str, int]]:
    # Join all the strings in the list
    text = ' '.join(lst)
    
    # Extract all emojis from the text
    emojis = [char for char in text if char in emoji.UNICODE_EMOJI]
    
    # Count the frequency of each emoji
    frequency = Counter(emojis)
    
    # Find the most common emojis
    most_common = frequency.most_common()
    
    return most_common

def most_common_hashtags(lst: List[str]) -> List[Tuple[str, int]]:
    # Join all the strings in the list
    text = ' '.join(lst)
    
    # Extract all hashtags from the text
    hashtags = re.findall(r"#(\w+)", text)
    
    # Count the frequency of each hashtag
    frequency = Counter(hashtags)
    
    # Find the most common hashtags
    most_common = frequency.most_common()
    
    return most_common
class AnalyzeView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request: Any, format: str = None) -> Response:
       
        text_to_analyze: List[str] = []
        

        with open("assets/DataRedesSociales.csv", "r", encoding="utf-8") as csv_file:
            reader = csv.reader(csv_file)
            next(reader)  # Ignorar la primera fila
            for row in reader:
                text_to_analyze.append(row[1])
        quantity: int = 200
        print(quantity)
        # finiteautomata/beto-emotion-analysis
        API_URL: str = "https://api-inference.huggingface.co/models/finiteautomata/beto-emotion-analysis"
        BETO_EMOTION_ANALYSIS_API_KEY: str = config(
            "BETO_EMOTION_ANALYSIS_API_KEY", default=""
        )
        headers: Dict[str, str] = {
            "Authorization": "Bearer {}".format(BETO_EMOTION_ANALYSIS_API_KEY)
        }

        def query(payload: Dict[str, Any]) -> Dict[str, Any]:
            response = requests.post(API_URL, headers=headers, json=payload)
            return response.json()

        emotion_output: List[List[Dict[str, Any]]] = query(
            {"inputs": text_to_analyze[:quantity]}
        )
      

        new_emotion_output: List[Dict[str, Any]] = []
        scores: Dict[str, List[float]] = {
            "others": [],
            "anger": [],
            "disgust": [],
            "surprise": [],
            "sadness": [],
            "joy": [],
            "fear": [],
        }

        for i in range(quantity):
            emotion_dict: Dict[str, Any] = {"text": text_to_analyze[i]}
            for emotion in emotion_output[i]:
                emotion_dict[emotion["label"]] = emotion["score"]
                scores[emotion["label"]].append(emotion["score"])
            new_emotion_output.append(emotion_dict)

        # Eliminar duplicados basados en el texto
        new_emotion_output = list({v["text"]: v for v in new_emotion_output}.values())

        # Calcular la media, mediana y moda para cada emoción
        stats: Dict[str, Dict[str, float]] = {}
        for emotion, score_list in scores.items():
            stats[emotion] = {
                "mean": statistics.mean(score_list),
                "median": statistics.median(score_list),
                "mode": statistics.mode(score_list),
            }
        # finiteautomata/beto-sentiment-analysis

        API_URL = "https://api-inference.huggingface.co/models/finiteautomata/beto-sentiment-analysis"
        BETO_SENTIMENT_ANALYSIS_API_KEY = config(
            "BETO_SENTIMENT_ANALYSIS_API_KEY", default=""
        )
        headers = {"Authorization": "Bearer {}".format(BETO_SENTIMENT_ANALYSIS_API_KEY)}

        def query(payload):
            response = requests.post(API_URL, headers=headers, json=payload)
            return response.json()

        sentiment_output = query(
            {
                "inputs": text_to_analyze[:quantity],
            }
        )

        new_sentiment_output: List[Dict[str, Any]] = []
        scores: Dict[str, List[float]] = {
            "NEG": [],
            "NEU": [],
            "POS": [],
        }

        for i in range(quantity):
            sentiment_dict: Dict[str, Any] = {"text": text_to_analyze[i]}
            for sentiment in sentiment_output[i]:
                sentiment_dict[sentiment["label"]] = sentiment["score"]
                scores[sentiment["label"]].append(sentiment["score"])
            new_sentiment_output.append(sentiment_dict)

        # Eliminar duplicados basados en el texto
        new_sentiment_output = list(
            {v["text"]: v for v in new_sentiment_output}.values()
        )

        # Calcular la media, mediana y moda para cada emoción
        stats_sentiment: Dict[str, Dict[str, float]] = {}
        for sentiment, score_list in scores.items():
            stats_sentiment[sentiment] = {
                "mean": statistics.mean(score_list),
                "median": statistics.median(score_list),
                "mode": statistics.mode(score_list),
            }
        most_common_words_list = most_common_words(text_to_analyze)
        most_common_emojis_list = most_common_emojis(text_to_analyze)
        most_common_hashtags_list = most_common_hashtags(text_to_analyze)
  
        return Response(
            {
                "emotion": {"data": new_emotion_output, "stats": stats},
                "sentiment": {
                    "data": new_sentiment_output,
                    "stats": stats_sentiment,
                },
                "extra_data":{
                    "most_common_words": most_common_words_list,
                    "most_common_emojis": most_common_emojis_list,
                    "most_common_hashtags": most_common_hashtags_list,


                }
            }
        )
