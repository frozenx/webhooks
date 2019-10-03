import React from 'react'

const dotLoader = () => {
    return (
        <React.Fragment>
            <div className = "loading-dots">
                <span className="dot one">.</span>
                <span className="dot two">.</span>
                <span className="dot three">.</span>
            </div>

            <style jsx = "true" global = "true">
            {`
                .loading-dots {
                    text-align: center;
                    z-index: 5;
                    line-height: 10px;
                    margin: 0 auto;
                    margin-top: -11px;
                }
                .loading-dots .dot {
                    margin: 0px 1px;
                    position: relative;
                    font-size: 35px;
                    opacity: 0;
                    animation: showHideDot 2.5s ease-in-out infinite;
                }
                .loading-dots .dot.one {
                    animation-delay: 0.2s;
                }
                .loading-dots .dot.two {
                    animation-delay: 0.4s;
                }
                .loading-dots .dot.three {
                    animation-delay: 0.6s;
                }
                
                @keyframes showHideDot {
                    0% {
                        opacity: 0;
                   }
                    50% {
                        opacity: 1;
                   }
                    60% {
                        opacity: 1;
                   }
                    100% {
                        opacity: 0;
                   }
                }
            `}
            </style> 
         </React.Fragment>
    )
}

export default dotLoader