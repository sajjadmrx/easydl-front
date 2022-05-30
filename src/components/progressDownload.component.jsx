export function ProgressDownload(props) {
    const valueState = props.valueProgress;

    return (
        <div className="flex items-center justify-center w-full h-full" style={{ display: valueState > 0 ? 'block' : 'none' }}>
            {valueState}% <progress className="progress progress-primary w-56" value={valueState} max="100"></progress>
        </div>
    )
}