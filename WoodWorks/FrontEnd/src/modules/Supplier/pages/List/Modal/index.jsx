import React from 'react';
import { Button, Input, Modal } from 'semantic-ui-react';

function ListModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="tiny"
      dimmer
    >
      <Modal.Header>
        Add Product Details
      </Modal.Header>

      <Modal.Content>
        <select style={{width:"100%",padding:"10px",border:"1px solid gray",outline:"none", marginBottom: "10px"}} name="" id="">
        <option value="">Select Product Category</option>
          <option value="">Doors</option>
          <option value="">Handrails</option>
          <option value="">Deck</option>
          <option value="">Boundary Wall</option>
          <option value="">Flooring</option>
        </select>
        {/* <Input fluid placeholder="Enter Product Category" style={{ marginBottom: "10px" }} /> */}
        {/* <Input fluid placeholder="Enter Product Name" style={{ marginBottom: "10px" }} /> */}
        <input style={{width:"100%",padding:"10px",border:"1px solid gray",outline:"none", marginBottom: "10px"}}  type="text" placeholder='Enter Product Name'/>
        <select style={{width:"100%",padding:"10px",border:"1px solid gray",outline:"none", marginBottom: "10px"}} name="" id="">
          <option value="">Product Industry size</option>
        <option value="">Width: 16ft- Height: 8ft</option>
          <option value="">Width: 16ft- Height: 8ft</option>
          <option value="">Width: 26ft- Height: 18ft</option>
          <option value="">Width: 36ft- Height: 28ft</option>
          
        </select>
        {/* <Input fluid placeholder="Product Industry Size" style={{ marginBottom: "10px" }} /> */}
        <input style={{width:"100%",padding:"10px",border:"1px solid gray",outline:"none", marginBottom: "10px"}}  type="text" placeholder='Product Finish Type'/>
        {/* <Input fluid placeholder="Product Finish Type" style={{ marginBottom: "10px" }} /> */}
        <input style={{width:"100%",padding:"10px",border:"1px solid gray",outline:"none", marginBottom: "10px"}}  type="text" placeholder='Enter Colour'/>
        <input style={{width:"100%",padding:"10px",border:"1px solid gray",outline:"none", marginBottom: "10px"}}  type="text" placeholder='Enter Image URL'/>
        <input style={{width:"100%",padding:"10px",border:"1px solid gray",outline:"none", marginBottom: "10px"}}  type="text" placeholder='Price'/>
        <input style={{width:"100%",padding:"10px",border:"1px solid gray",outline:"none", marginBottom: "10px"}}  type="text" placeholder='Quantity'/>
        {/* <Input fluid placeholder="Enter Colour" style={{ marginBottom: "10px" }} /> */}
        {/* <Input fluid placeholder="Enter Image URL" style={{ marginBottom: "10px" }} /> */}

        <Button>
          Submit
        </Button>
      </Modal.Content>
    </Modal>
  )
}

export default ListModal