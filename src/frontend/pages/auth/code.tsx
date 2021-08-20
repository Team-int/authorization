import { NextPage  } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import api from "../../utils/api"

const AuthCode: NextPage = () => {
    const router = useRouter()
    const { code } = router.query
    const [loadMessage, setMessage] = useState('로딩중...')
    

    useEffect(() => {
        if (!code)
            return setMessage('뭔가 잘못된것 같아요!')
        api.post(`/auth/guild`, {code})
        .then(res => {
            const { data } = res
            if (!data.success)
                return setMessage('뭔가 잘못된것 같아요!')
            localStorage.setItem('code', String(code))
            location.href = String(process.env.OAUTH_URL)
        })
    }, [])

    return (
        <p className="text-center mt-12 text-2xl">
            {loadMessage}
        </p>
    )
}

export default AuthCode