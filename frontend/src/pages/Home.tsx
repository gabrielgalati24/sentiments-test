import { useEffect, useState } from 'react'
import AnalysisComponent from '../components/AnalysisComponent'

import { Loader } from '@mantine/core';
import { endpoints } from '../utils/endpoints';
const BASE_URL = import.meta.env.VITE_URL_BACKEND || "http://localhost:8000/api" + endpoints.analyze;

export default function Home() {

    const [data, setData] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        setIsLoading(true)
        fetch(BASE_URL, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }


        }).then(res => {
            res.status === 401 && window.location.replace('/login')
            return res.json()
        }).then(res => {
            console.log(res)
            setData(res)
        })
            .catch(err => {
                console.log(err)
            }).finally(() => setIsLoading(false))
    }, [])
    return (
        isLoading ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h2>
                Estamos analizando tus datos, espera un momento por favor...
            </h2>
            <Loader color="blue" size="xl" />

        </div> :
            <AnalysisComponent data={data} />
    )
}
