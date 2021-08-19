import { NextPage } from "next"
import Link from "next/link"
import Image from "next/image"

const Home: NextPage = () => {
  return (
    <div className="text-center bg-gray-900 min-w-screen py-24 relative wave">
      <div className="mb-2">
        <p className="text-5xl text-green-500">
          Authorization
          {/* <Image
            src="/img/authorization.png"
            alt="auth"
            width={41}
            height={41}
          /> */}
        </p>
        <p className="mt-4 text-4xl">
          디스코드 인증봇
        </p>
      </div>
      <div className="flex justify-center mt-16">
        <button className="ml-3 bg-indigo-400 p-3 px-5 pb-2 rounded transform duration-100 hover:-translate-y-1 flex">
          <div className="mt-0.5 mr-1">
            <Image 
              src="/img/plus.png"
              alt="- "
              width={21.5}
              height={21.5}
              className="ml-1 mt-1"
            />
          </div>
          <Link
            href=""
            passHref={true}
          >
            <p className="font-semibold text-base">
              초대하기
            </p>
          </Link>
        </button>
        <button className="ml-3 bg-blue-400 p-3 px-5 pb-2 rounded transform duration-100 hover:-translate-y-1 flex">
          <div className="mr-0.5">
            <Image 
              src="/img/list.png"
              alt="- "
              width={25}
              height={25}
            />
          </div>
          <Link
            href="/commands"
            passHref={true}
          >
            <p className="font-semibold text-base">
              명령어
            </p> 
          </Link>
        </button>
      </div>
    </div>
    
  )
}

export default Home