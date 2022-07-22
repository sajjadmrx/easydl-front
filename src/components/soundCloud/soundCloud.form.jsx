import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { FormContext } from "../../contexts/form.context";
import { soundcloudService } from "../../service/index.service";
import { isLink } from "../../utils/regex.util";
import axios, {AxiosError} from "axios";

export function SoundCloudFormComponent(props) {
    const [buttonText, setButtonText] = useState('دانلود')
    const [waiting, setWaiting] = useState(false)
    const formContext = useContext(FormContext)
    useEffect(() => {
        if (!buttonText) {
            setButtonText('دانلود')
            formContext.setLoading(false)
        }
    }, [buttonText])
    return (
        <form className="flex flex-col items-center" onSubmit={(e) => downloadHandler(e, setWaiting, setButtonText, formContext)} id={"soundCloudForm"}>
            <input type="text" placeholder="لینک سینگل موزیک خود را وارد کنید..." className="input input-bordered   w-full max-w-xs mb-2" />
            <button className={`btn btn-wide ${waiting && "loading"}`}>
                {!waiting && <FontAwesomeIcon icon={['fas', 'download']} className='mr-2' />}
                {buttonText}
            </button>
        </form >
    )
}

function downloadHandler(e, setWaiting, setButtonText, formContext) {
    try {
        e.preventDefault();
        if (formContext.loading) return alert('لطفا تا پایان دانلود صبر کنید...')
        let value = e.target.querySelector('input').value;
        if (!value || !isLink(value)) return alert('یک لینک معتبر وارد کنید')
        setWaiting(true)
        setButtonText("لطفا صبر کنید...")
        formContext.setLoading(true)
        soundcloudService.download(value, (prog) => {
            if (prog == 100) {
                setWaiting(false)
                setButtonText(null)
            }
        })
    } catch (error) {
        setWaiting(false)
        setButtonText(null)
        AxiosError(error,(er)=>alert(er))

    }
    finally {
        // formContext.setLoading(false)
    }
}