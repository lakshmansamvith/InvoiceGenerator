import React, {Component} from 'react';
import { InputGroup, FormControl, Box, Typography } from '@mui/material';

class EditableField extends Component {
  render() {
    const { cellData, onItemizedItemEdit } = this.props;

    return (
      <Box className="my-1 d-flex align-items-center">
        {cellData.leading != null && (
          <Box
            className="bg-light fw-bold border-0 text-secondary px-2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              border: '2px solid #6c757d',
              borderRadius: '50%',
            }}
          >
            <Typography variant="body2">{cellData.leading}</Typography>
          </Box>
        )}
        <FormControl
          className={cellData.textAlign}
          type={cellData.type}
          placeholder={cellData.placeholder}
          inputProps={{
            min: cellData.min,
            name: cellData.name,
            id: cellData.id,
            step: cellData.step,
            precision: cellData.precision,
            'aria-label': cellData.name,
          }}
          value={cellData.value}
          onChange={onItemizedItemEdit}
          required
        />
      </Box>
    );
  }
}

export default EditableField;
