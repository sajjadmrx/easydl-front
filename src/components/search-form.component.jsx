import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export function SearchForm(props) {
    const setSongs = props.setSongs;
    return (
        <form className="flex flex-col items-center" onSubmit={(e) => submitHandler(e, setSongs)}>
            <input type="text" placeholder="لینک موزیک اسپاتیفای یا رادیوجوان" className="input w-full max-w-xs mb-2" />
            <button className="btn btn-wide ">
                📥    جستجو و دانلود
            </button>
            <ToastContainer theme='dark' />
        </form>
    )
}
async function submitHandler(e, setSongs) {
    e.preventDefault();
    const value = e.target.querySelector('input').value;
    const button = e.target.querySelector('button');
    if (!value || !isLink(value)) {
        toast.error('لطفا یک لینک معتبر وارد کنید', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        return;
    }
    let targetUrl = ''
    switch (true) {
        case isRjLink(value): targetUrl = 'rj'; break;
        case isSpotifyLink(value): targetUrl = 'spotify'; break;
        default: targetUrl = 'unknown';
    }

    if (targetUrl == 'unknown') {
        toast.error('لطفا یک لینک معتبر وارد کنید', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        return;
    }
    button.classList.add('loading');
    try {
        const result = await axios.get('http://localhost:5000/search?q=' + value, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            },
        })
        setSongs(result.data);
    } catch (error) {

    } finally {
        button.classList.remove('loading');
    }
}

function isLink(value) {
    const regex = /^(http|https):\/\/[^ "]+$/;
    return regex.test(value);
}
function isRjLink(value) {
    const links = ['https://rj.app/m/', 'https://www.radiojavan.com/mp3s/mp3/']
    return links.some(link => value.startsWith(link));
}
function isSpotifyLink(value) {
    const regex = /^(http|https):\/\/open\.spotify\.com\/track\/[^ "]+$/;
    return regex.test(value);
}