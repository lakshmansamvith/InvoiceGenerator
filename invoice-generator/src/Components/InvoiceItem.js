import React, {Component} from 'react';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import ItemRow from './ItemRow';

export default class InvoiceItem extends Component {
  render() {
    const { onItemizedItemEdit, currency, onRowDel, items } = this.props;

    const itemTable = items.map((item) => (
      <ItemRow
        onItemizedItemEdit={onItemizedItemEdit}
        item={item}
        onDelEvent={() => onRowDel(item)}
        key={item.id}
        currency={currency}
      />
    ));

    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>QTY</th>
              <th>PRICE/RATE</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {itemTable}
          </tbody>
        </Table>
        <Button className="fw-bold" onClick={this.props.onRowAdd}>Add Item</Button>
      </div>
    );
  }
}



