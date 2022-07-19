import React from 'react'
import { TextInput, Alert } from 'flowbite-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { spotifyService } from '../../service/index.service';
import { axiosError } from '../../handlers/error.handler';
import { isLink, isSpotifyLink } from '../../utils/regex.util';
import { useEffect } from 'react';
import { FormContext } from '../../contexts/form.context';
export function SpotifyFormComponent(props) {
    const setSongs = props.setSongs;
    const [errorState, setErrorState] = React.useState(false);
    const [buttonText, setButtonText] = React.useState('');
    const [waiting, setWaiting] = React.useState(false)
    const fromContext = React.useContext(FormContext)
    useEffect(() => {
        if (!buttonText) {
            setButtonText('دانلود');
            fromContext.setLoading(false)
            setWaiting(false)
        }
    }, [buttonText])
    useEffect(() => {
        if (errorState && errorState != '') {
            alert(errorState)
        }
    }, [errorState])
    return (
        <form className="flex flex-col items-center" onSubmit={(e) => submitHandler(e, setSongs, setErrorState, setButtonText, setWaiting, fromContext)} >
            <input type="text" placeholder="لینک سینگل موزیک خود را وارد کنید..." className="input input-bordered input-success w-full max-w-xs mb-2" />
            <button className="btn btn-wide ">
                {!waiting && <FontAwesomeIcon icon={['fas', 'download']} className='mr-2' />}
                {buttonText}
            </button>
        </form >
    )
}
async function submitHandler(e, setSongs, setErrorState, setButtonText, setWaiting, fromContext) {
    e.preventDefault();
    setSongs([]);
    setErrorState(false);
    if (fromContext.loading) return alert('تا پایان دانلود صبر کنید...');
    let value = e.target.querySelector('input').value;
    const button = e.target.querySelector('button');
    if (!value || !isLink(value)) {
        alert('لطفا یک لینک معتبر وارد کنید')
        return;
    }
    let targetUrl = ''
    switch (true) {
        case isSpotifyLink(value): targetUrl = 'spotify'; break;
        default: targetUrl = 'unknown';
    }

    if (targetUrl == 'unknown') {
        alert('لطفا یک لینک معتبر وارد کنید')
        return;
    }
    try {
        if (targetUrl == 'spotify') {
            setWaiting(true)
            fromContext.setLoading(true)

            const indexOf = value.indexOf("&")
            if (indexOf > 0) {
                value = value.substring(0, indexOf)
            }
            button.classList.add('loading');
            setButtonText('لطفا صبر کنید...')
            const data = await spotifyService.search(value)

            if (data.length > 0) {
                await spotifyService.download({ id: data[0].id, spotifyUrl: value }, (prog) => {
                    if (prog == 100) {
                        setButtonText(null)
                        button.classList.remove('loading');
                    } else {
                        setButtonText(`${prog} در حال دانلود...`)
                    }
                })
            }
            else {
                setButtonText(null)
                button.classList.remove('loading');
            }
        }
        else {
            setWaiting(false)
            alert('لطفا یک لینک معتبر وارد کنید')
        }
    } catch (error) {
        console.log(error)
        axiosError(error, (err)=>alert(err))
    } finally {
     /*   button.classList.remove('loading');*/
  /*      setButtonText('')
        setWaiting(false)
        fromContext.setLoading(false)*/
    }
}



