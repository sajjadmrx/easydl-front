export function WarningAlertComponent(props) {
    const text = props.text;
    const className = props.className;
    return (
        <div className={className} onClick={(e) => e.remove()}>
            <div className="alert alert-warning shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    <span>{text}</span>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export function ErrroAlertComponent(props) {
    const text = props.text;
    const className = props.className;
    return (
        <div className={className}>
            <div className="alert alert-error shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{text}</span>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export function DarkAlertComponent(props) {
    const text = props.text;
    const className = props.className;
    const id = props.id
    return (
        <div className={className}>
            <div className="alert shadow-lg" id={id}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         className="stroke-info flex-shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{text}</span>
                </div>
                <div className="flex-none">
                    <button className="btn btn-sm btn-ghost close" onClick={() => destory(id)}>باشه!</button>
                </div>
            </div>
        </div>
    )
}

function destory(id) {
    document.getElementById(id).remove()
}