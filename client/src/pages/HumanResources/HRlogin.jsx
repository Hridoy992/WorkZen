import { SignIn } from "../../components/common/sign-in.jsx"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'
import { CommonStateHandler } from "../../utils/commonhandler.js"
import { HandleGetHumanResources, HandlePostHumanResources } from "../../redux/Thunks/HRThunk.js"

export const HRLogin = () => {
    const HRState = useSelector((state) => state.HRReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loadingbar = useRef(null)
    const [signinform, setsigninform] = useState({
        email: "",
        password: ""
    })

    // Clear logout flag when component mounts (user is trying to login)
    useEffect(() => {
        sessionStorage.removeItem('hasLoggedOut');
    }, []);

    const handlesigninform = (event) => {
        CommonStateHandler(signinform, setsigninform, event)
    }

    const handlesigninsubmit = (e) => {
        e.preventDefault();
        loadingbar.current.continuousStart();
        dispatch(HandlePostHumanResources({ apiroute: "LOGIN", data: signinform }))

    }

    if (HRState.error.status) {
        loadingbar.current.complete()
    }

    useEffect(() => {
        // Don't automatically check login status on component mount
        // Let user manually login instead
        if (HRState.isAuthenticated) {
            loadingbar.current.complete()
            navigate("/HR/dashboard")
        }
    }, [HRState.isAuthenticated])


    return (
        <div>
            <div className="employee-login-content flex justify-center items-center h-[100vh]">
                <LoadingBar ref={loadingbar} />
                <SignIn 
                    image={"../../src/assets/Employee-Welcome.jpg"} 
                    handlesigninform={handlesigninform} 
                    handlesigninsubmit={handlesigninsubmit} 
                    targetedstate={HRState} 
                    statevalue={signinform} 
                    redirectpath={"/auth/HR/forgot-password"} 
                    signupPath={"/auth/HR/signup"}
                />
            </div>
        </div>
    )
}