import React, { Component } from "react";

const WithPagination = (...PassedComponent) => {
    class HOC extends Component {
        render() {
            return (
                PassedComponent.map((PassedComp, index) => {
                    let mergedProps = {
                        ...this.props.paginationProps,
                        ...this.props.componentProps
                    }
                    return <PassedComp {...mergedProps} key={index} />
                })
            )
        }
    }
    return HOC
}

export default WithPagination;