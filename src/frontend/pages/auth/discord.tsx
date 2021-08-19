import { NextPage  } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import api from "../../utils/api"

const AuthDiscord: NextPage = () => {
    const router = useRouter()
    const { code } = router.query
    const [loadMessage, setMessage] = useState('로딩중...')

    useEffect(() => {
        if (!code)
            return history.back()
        api.post('/auth/discord', {
            code
        }).then(res => {
            const { data } = res
            if (!data.success)
                return setMessage('뭔가 이상하네요!')
            localStorage.setItem('refresh_token', String(data.refresh_token))
            location.href = '/auth/verify'
        })
    }, [])

    return (
        <p className="text-center mt-12 text-2xl">
            {loadMessage}
        </p>
    )
}

export default AuthDiscord