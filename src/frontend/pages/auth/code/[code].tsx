import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import api from "../../../utils/api"

const AuthCode: NextPage = () => {
    const router = useRouter()
    const { code } = router.query

    useEffect(() => {
        if (!code)
            return alert('코드를 찾을 수 없어요!')
        api.post(`/auth/guild`, {code})
        .then(res => {
            const { data } = res
            if (!data.success)
                return alert('코드를 찾을 수 없어요!')
            localStorage.setItem('code', String(code))
            location.href = String(process.env.OAUTH_URL)
        })
    }, [])

    return (
        <p className="text-center mt-24 text-3xl">
            코드를 확인하고있어요!
        </p>
    )
}

export default AuthCode