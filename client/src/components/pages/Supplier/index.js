import React, { Component } from "react";
import SupplierDetails from "../../atoms/SupplierDetails/";
import Loader from '../../atoms/Loader';
import EditSupplierDetails from "../../atoms/EditSupplierDetails/";
import {
  PrimaryWrapper,
  TabWrapper,
} from '../../../common/styles'

export class Supplier extends Component {
    state = {
      supplierDetails: true,
      editSupplierDetails: false,
      supplierData: null,
      supplierValues: {},
      editSupplierData: null,
      errorSupplierData:null
    }
  

   componentDidMount(){
     let id = this.props.id? this.props.id : 1234
     this.getData(id)
  }

  getData = async (id) => {
    try{
      const jsonRes = await fetch(`/tradingpartner/api/supplier?supplierNumber=${id}`);
      const data = await jsonRes.json();
      delete data.suppliers[0].id
      let supplierKey = Object.keys(data.suppliers[0]);
      this.setState({
        supplierData: supplierKey,
        supplierValues: data.suppliers[0],
        editSupplierData:data.suppliers[0]
      });
    } catch(err){
      // this.setState({
      //     errorSupplierData:err
      // });
    }
    
  }

  componentWillReceiveProps(nextProps, props) {
    if(nextProps.id != props.id) {
      this.getData(nextProps.id)
    }
  }
  _handleEditSupplierDetails = () => {
    this.setState({
      supplierDetails: false,
      editSupplierDetails: true,
      editSupplierData: this.state.supplierValues
    });
  };

  _handleSupplierChange = e => {
    let tempSupplierValues = {};
    const { name, value } = e.target;
    tempSupplierValues[name] = value;
    this.setState(prevState => ({
      supplierValues: { ...prevState.supplierValues, ...tempSupplierValues }
    }));
  };

  _handleSubmitSupplierDetails = (e) =>{
    e.preventDefault();
    this.setState({
      supplierDetails: true,
      editSupplierDetails: false,
      editSupplierData: this.state.supplierValues
    });
  }
  _handleCanselSupplierDetails = (e) =>{
    this.setState({
      supplierDetails: true,
      editSupplierDetails: false,
    });
  }

  render() {
    const {
      supplierDetails,
      editSupplierDetails,
      supplierData,
      editSupplierData
    } = this.state;

      const { activeTab } = this.state;
    if (!editSupplierData) {
      return (<div className="loader-parent-container"><Loader /></div>)
  } 
  else {
      return (
        <PrimaryWrapper>
           <TabWrapper>
            <div>
            {(supplierDetails && editSupplierData!=null) ? (
              <SupplierDetails
                handleEditSupplierDetails={
                  this._handleEditSupplierDetails
                }
                supplierData={supplierData}
                editSupplierData={editSupplierData}
              />
            ) : null}
            {editSupplierDetails ? (
              <EditSupplierDetails
                editSupplierData={editSupplierData}
                handleSupplierChange={e =>
                  this._handleSupplierChange(e)
                }
                handleSubmitSupplierDetails={
                  this._handleSubmitSupplierDetails
                }
                handleCanselSupplierDetails={this._handleCanselSupplierDetails}
                supplierData={supplierData}
              />
            ) : null}
            </div>
          </TabWrapper>
        </PrimaryWrapper>
      );
    
    }
    
    }
  }

export default Supplier;