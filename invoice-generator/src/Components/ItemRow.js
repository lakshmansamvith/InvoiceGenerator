import React, {Component} from 'react';
import { BiTrash } from "react-icons/bi";
import EditableField from './EditableField';

export default class ItemRow extends Component {
    onDelEvent = () => {
    }
  
    render() {
        this.props.onDelEvent(this.props.item);
        const { onItemizedItemEdit, item, currency } = this.props;
  
      return (
        <tr>
          <td style={{ width: '100%' }}>
            <EditableField
              onItemizedItemEdit={onItemizedItemEdit}
              cellData={{
                type: "text",
                name: "name",
                placeholder: "Item name",
                value: item.name,
                id: item.id,
              }}
            />
            <EditableField
              onItemizedItemEdit={onItemizedItemEdit}
              cellData={{
                type: "text",
                name: "description",
                placeholder: "Item description",
                value: item.description,
                id: item.id,
              }}
            />
          </td>
          <td style={{ minWidth: '70px' }}>
            <EditableField
              onItemizedItemEdit={onItemizedItemEdit}
              cellData={{
                type: "number",
                name: "quantity",
                min: 1,
                step: "1",
                value: item.quantity,
                id: item.id,
              }}
            />
          </td>
          <td style={{ minWidth: '130px' }}>
            <EditableField
              onItemizedItemEdit={onItemizedItemEdit}
              cellData={{
                leading: currency,
                type: "number",
                name: "price",
                min: 1,
                step: "0.01",
                precision: 2,
                textAlign: "text-end",
                value: item.price,
                id: item.id,
              }}
            />
          </td>
          <td className="text-center" style={{ minWidth: '50px' }}>
            <BiTrash onClick={this.onDelEvent} style={{ height: '33px', width: '33px', padding: '7.5px' }} className="text-white mt-1 btn btn-danger" />
          </td>
        </tr>
      );
    }
  }
