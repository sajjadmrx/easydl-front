export function VideoPlayerComponent(prop) {
    const url = prop.url;
    return (
        <div>
            <video class="w-full" controls>
                <source src={url} type="video/mp4" />
            </video>
        </div>
    )
}