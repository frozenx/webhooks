import React from "react";
import Pagination from '@beans/colleague-pagination'
import { PaginationStyle } from './styled'

const PaginationComponent = props => {
    return (
        <>
            {props.totalCount > 0 &&
                <PaginationStyle>
                    <Pagination
                        hrefTemplate={props.linkTemplate}
                        totalResults={props.totalCount}
                        pageControlsText={props.pageText}
                        currentPage={props.currentPage}
                        onPaginate={(pageConfig, e) => {
                            e.preventDefault();
                            props.handlePageChange(pageConfig.nextPage);
                            props.getNewPage(pageConfig.nextPage);
                        }}
                    />
                </PaginationStyle>
            }
        </>
    )
};

export default PaginationComponent