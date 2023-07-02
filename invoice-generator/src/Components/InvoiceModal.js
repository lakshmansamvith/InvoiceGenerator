import React from 'react';
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    border: 'none',
  },
  tableCell: {
    width: '100px',
  },
}));

function GenerateInvoice() {
  html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [612, 792]
    });
    pdf.internal.scaleFactor = 1;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoice-001.pdf');
  });
}

function InvoiceModal(props) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        open={props.showModal}
        onClose={props.closeModal}
        className={classes.modal}
      >
        <div className={classes.paper}>
          <div id="invoiceCapture">
            <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
              <div className="w-100">
                <Typography variant="h6" className="fw-bold my-2">{props.info.billFrom || 'John Uberbacher'}</Typography>
                <Typography variant="subtitle1" className="fw-bold text-secondary mb-1">
                  Invoice #: {props.info.invoiceNumber || ''}
                </Typography>
              </div>
              <div className="text-end ms-4">
                <Typography variant="subtitle1" className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</Typography>
                <Typography variant="h5" className="fw-bold text-secondary">{props.currency} {props.total}</Typography>
              </div>
            </div>
            <div className="p-4">
              <Grid container spacing={2} className="mb-4">
                <Grid item md={4}>
                  <Typography variant="subtitle1" className="fw-bold">Billed to:</Typography>
                  <Typography variant="body1">{props.info.billTo || ''}</Typography>
                  <Typography variant="body1">{props.info.billToAddress || ''}</Typography>
                  <Typography variant="body1">{props.info.billToEmail || ''}</Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography variant="subtitle1" className="fw-bold">Billed From:</Typography>
                  <Typography variant="body1">{props.info.billFrom || ''}</Typography>
                  <Typography variant="body1">{props.info.billFromAddress || ''}</Typography>
                  <Typography variant="body1">{props.info.billFromEmail || ''}</Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography variant="subtitle1" className="fw-bold mt-2">Date Of Issue:</Typography>
                  <Typography variant="body1">{props.info.dateOfIssue || ''}</Typography>
                </Grid>
              </Grid>
              <Table className="mb-0">
                <TableHead>
                  <TableRow>
                    <TableCell>QTY</TableCell>
                    <TableCell>DESCRIPTION</TableCell>
                    <TableCell className={classes.tableCell}>PRICE</TableCell>
                    <TableCell className={classes.tableCell}>AMOUNT</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.items.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell style={{ width: '70px' }}>{item.quantity}</TableCell>
                      <TableCell>{item.name} - {item.description}</TableCell>
                      <TableCell className={classes.tableCell}>{props.currency} {item.price}</TableCell>
                      <TableCell className={classes.tableCell}>{props.currency} {item.price * item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                  </TableRow>
                  <TableRow className="text-end">
                    <TableCell></TableCell>
                    <TableCell className="fw-bold" style={{ width: '100px' }}>SUBTOTAL</TableCell>
                    <TableCell className={classes.tableCell}>{props.currency} {props.subTotal}</TableCell>
                  </TableRow>
                  {props.taxAmmount !== 0.00 &&
                    <TableRow className="text-end">
                      <TableCell></TableCell>
                      <TableCell className="fw-bold" style={{ width: '100px' }}>TAX</TableCell>
                      <TableCell className={classes.tableCell}>{props.currency} {props.taxAmmount}</TableCell>
                    </TableRow>
                  }
                  {props.discountAmmount !== 0.00 &&
                    <TableRow className="text-end">
                      <TableCell></TableCell>
                      <TableCell className="fw-bold" style={{ width: '100px' }}>DISCOUNT</TableCell>
                      <TableCell className={classes.tableCell}>{props.currency} {props.discountAmmount}</TableCell>
                    </TableRow>
                  }
                  <TableRow className="text-end">
                    <TableCell></TableCell>
                    <TableCell className="fw-bold" style={{ width: '100px' }}>TOTAL</TableCell>
                    <TableCell className={classes.tableCell}>{props.currency} {props.total}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {props.info.notes &&
                <div className="bg-light py-3 px-4 rounded">
                  {props.info.notes}
                </div>}
            </div>
          </div>
          <div className="pb-4 px-4">
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Button variant="contained" color="primary" onClick={GenerateInvoice}>
                  <BiPaperPlane style={{ width: '15px', height: '15px', marginTop: '-3px' }} className="me-2" />Send Invoice
                </Button>
              </Grid>
              <Grid item md={6}>
                <Button variant="outlined" color="primary" onClick={GenerateInvoice}>
                  <BiCloudDownload style={{ width: '16px', height: '16px', marginTop: '-3px' }} className="me-2" />
                  Download Copy
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </Modal>
      <hr className="mt-4 mb-3" />
    </div>
  );
}

export default InvoiceModal;
