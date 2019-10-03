import React, { Component, Fragment } from "react";
import { Table } from "@beans/colleague-table";
import RadioButton from "@beans/radio-button";
import Button from '@beans/button';
import Label from '@beans/label';
import i18Data from '../../../languagepack';
import './styled';
import { TableHead, ButtonContainer, SelectContainer } from "./styled";

class CustomTable extends Component {
  state = {
    preview: true,
    data: null,
    showTable: false,
    checked: null
  };


  constructData = (columns, rows) => {
    const constructColumns = columns.map(c => {
      let obj = {};
      obj["name"] = c;
      return obj;
    });

    const constructRows = rows.map((r, index) => {
      let obj = {};
      if(this.props.tabId =='tab2') {
        obj["rowData"] = [
          <RadioButton
            key={r.siteId}
            checked={this.state.checked === index ? true : false}
            onChange={() => this._handleRadioClick(index, r.uuid)}
          />,
          r.siteName,
          r.siteCodeId
        ];
      }else{
        obj["rowData"] = [
          <RadioButton
            key={r.paymentTermsName}
            checked={this.state.checked === index ? true : false}
            onChange={() => this._handleRadioClick(index, r.uuid)}
          />,
          r.paymentTermsName
        ];
      }
      return obj;
    });
    return {
      columns: constructColumns,
      rows: constructRows
    };
  };

  _handleRadioClick = (index, uuid) => {
    this.props.radioHandleClick(uuid, this.props.tabId)
    this.setState({
      checked: index
    }, () => {
      this._updateTable()
    });
  };

  componentDidMount() {
    this._updateTable()
  }

  _updateTable = () => {
    const { columns, rows } = this.props;    
    const data = this.constructData(columns, rows);
    this.setState({
      data,
      showTable: true
    });
  }

  render() {
    return (
      <Fragment>
        {
          this.state.data ?
          <Fragment>
            <Label dark emphasized>
              <TableHead>
                {i18Data.tableHead}
              </TableHead>
            </Label>
            <Table data={this.state.data} />
            <ButtonContainer>  
              <SelectContainer>                    
                <Button variant='primary' disabled={this.state.checked || this.state.checked === 0 ? false : true} onClick={() => this.props.handleClick(i18Data.select, this.props.tabId)}>{ i18Data.SELECT}</Button>              
              </SelectContainer>   
              <Button variant='secondary' onClick={() => this.props.handleClick(i18Data.addNew, this.props.tabId)}>{ i18Data.ADD_NEW}</Button>
            </ButtonContainer>
          </Fragment>
          :
          null
        }
      </Fragment>
    )
  }
}

export default CustomTable;
