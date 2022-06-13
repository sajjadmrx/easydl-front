import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosError } from '../handlers/error.handler';
import { radioJavanService, soundcloudService, spotifyService } from '../service/index.service';

import { isLink, isRjLink, isSoundcloudLink, isSpotifyLink } from '../utils/regex.util';
import { ErrroAlertComponent } from './alerts.component';


export function SearchForm(props) {
    const setSongs = props.setSongs;
    const [errorState, setErrorState] = React.useState(false);
    const [buttonText, setButtonText] = React.useState('');
    useEffect(() => {
        if (!buttonText) {
            setButtonText('📥    جستجو و دانلود');
        }
    }, [buttonText])
    useEffect(() => {
        if (errorState && errorState != '') {
            toast.error(errorState)
        }
    }, [errorState])
    return (
        <form className="flex flex-col items-center" onSubmit={(e) => submitHandler(e, setSongs, setErrorState, setButtonText)}>
            <input type="text" placeholder="لینک موزیک اسپاتیفای یا رادیوجوان" className="input w-full max-w-xs mb-2 input-bordered input-accent" />
            {errorState && <ErrroAlertComponent className='mb-2' text={errorState} />}
            <button className="btn btn-wide ">
                {buttonText}
            </button>
            <ToastContainer theme='dark' />
        </form>
    )
}
async function submitHandler(e, setSongs, setErrorState, setButtonText) {
    e.preventDefault();
    setSongs([]);
    setErrorState(false);
    let value = e.target.querySelector('input').value;
    const button = e.target.querySelector('button');
    if (!value || !isLink(value)) {
        toast.error('لطفا یک لینک معتبر وارد کنید')
        return;
    }
    let targetUrl = ''
    switch (true) {
        case isRjLink(value): targetUrl = 'rj'; break;
        case isSpotifyLink(value): targetUrl = 'spotify'; break;
        case isSoundcloudLink(value): targetUrl = 'soundcloud'; break;
        default: targetUrl = 'unknown';
    }

    if (targetUrl == 'unknown') {
        toast.error('لطفا یک لینک معتبر وارد کنید')
        return;
    }
    try {
        if (targetUrl == 'rj') {
            button.classList.add('loading');
            await radioJavanService.download(value, (progress) => {
                setButtonText(`${progress}% در حال دانلود ...`)
                if (progress == 100) {
                    setButtonText('')
                    button.classList.remove('loading');
                }
            })
            button.classList.remove('loading');
        }
        else if (targetUrl == 'soundcloud') {
            button.classList.add('loading');
            await soundcloudService.download(value, (progress) => {
                setButtonText(`${progress}% در حال دانلود ...`)
                if (progress == 100) {
                    setButtonText('')
                    button.classList.remove('loading');
                }
            })
            button.classList.remove('loading');
            return;
        }
        else if (targetUrl == 'spotify') {
            button.classList.add('loading');
            const indexOf = value.indexOf("&")
            if (indexOf > 0) {
                value = value.substring(0, indexOf)
            }
            const data = await spotifyService.search(value)
            setSongs(data);
            button.classList.remove('loading');
            return;
        }
        else {
            toast.error('لطفا یک لینک معتبر وارد کنید')
        }
    } catch (error) {
        axiosError(error, setErrorState)
    } finally {
        button.classList.remove('loading');
        setButtonText('')
    }
}



