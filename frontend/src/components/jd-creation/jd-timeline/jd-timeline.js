const JdTimeline = (props) => {
    const stage = props.stage;
    return (
        <ul className="timeline grid grid-flow-col justify-stretch">
            <li>
                <div className="timeline-start m-4">Define Role</div>
                <div className="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={stage>=1?"text-white h-5 w-5":"text-gray-400 h-5 w-5"}>
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd" />
                    </svg>
                </div>
                <hr className={stage>=1?"bg-white":"bg-gray-400"} />
            </li>
            
            <li>
                <hr className={stage>=2?"bg-white":"bg-gray-400"} />
                <div className="timeline-start m-4">Description Generation</div>
                <div className="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={stage>=2?"text-white h-5 w-5":"text-gray-400 h-5 w-5"}>
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd" />
                    </svg>
                </div>
                <hr className={stage>=2?"bg-white":"bg-gray-400"} />
            </li>
            
            <li>
                <hr className={stage>=3?"bg-white":"bg-gray-400"}/>
                <div className="timeline-start m-4">Save and Export</div>
                <div className="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={stage>=3?"text-white h-5 w-5":"text-gray-400 h-5 w-5"}>
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd" />
                    </svg>
                </div>
            </li>
        </ul>
    )
};

export default JdTimeline;