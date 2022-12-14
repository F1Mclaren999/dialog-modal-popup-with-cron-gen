import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { ReQuartzCron, Tab } from '@sbzen/re-cron';

function AlertsConfig({ selectedRowData, setSelectedRowData }) {
  React.useEffect(() => {
    if (
      selectedRowData &&
      Object.keys(selectedRowData).length > 0 &&
      selectedRowData.cutOffExpr.includes('minutes')
    ) {
      console.log('I am in useEffect...');
      const [time] = selectedRowData.cutOffExpr.split(' ');
      console.log('time...', time);
      setSelectedRowData(time, 'cutOffExpInMinutes');
    }
  }, []);

  const handleCheckBox = (event) => {
    console.log('handleCheckBox event...', event);
    setSelectedRowData(
      event ? '0' : '',
      event ? 'cutOffExpInMinutes' : 'cutOffExpr'
    );
  };

  return (
    <div style={{ padding: '10px' }}>
      <div>
        <div style={{ display: 'flex' }}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(event) => {
                  handleCheckBox(event.target.checked);
                }}
                checked={selectedRowData.cutOffExpInMinutes}
                value={selectedRowData.cutOffExpInMinutes}
                name="Enable CutOff Expression in Min"
                color="primary"
              />
            }
            label="Enable CutOff Expression in Min"
          />
        </div>

        {selectedRowData.cutOffExpInMinutes ? (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
              style={{
                marginBottom: '10px',
                justifyContent: 'space-between',
                display: 'flex',
              }}
            >
              <label>CutOff in Min </label>
              <input
                style={{ width: '55%' }}
                type="text"
                onChange={(event) =>
                  setSelectedRowData(event.target.value, 'cutOffExpInMinutes')
                }
                value={
                  selectedRowData &&
                  Object.keys(selectedRowData).length > 0 &&
                  selectedRowData.cutOffExpr
                    ? selectedRowData.cutOffExpr
                    : ''
                }
              />
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
              style={{
                marginBottom: '10px',
                justifyContent: 'space-between',
                display: 'flex',
              }}
            >
              <label>CutOffExp</label>
              <input
                style={{ width: '55%' }}
                type="text"
                value={
                  selectedRowData &&
                  Object.keys(selectedRowData).length > 0 &&
                  selectedRowData.cutOffExpr
                    ? selectedRowData.cutOffExpr
                    : ''
                }
                readOnly
              />
            </div>
          </div>
        )}
        {selectedRowData.cutOffExpInMinutes ? (
          ''
        ) : (
          <div>
            <ReQuartzCron
              tabs={[Tab.MINUTES, Tab.HOURS, Tab.DAY, Tab.MONTH, Tab.YEAR]}
              value={selectedRowData.cutOffExpr}
              onChange={(e) => setSelectedRowData(e, 'cutOffExpr')}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AlertsConfig;
