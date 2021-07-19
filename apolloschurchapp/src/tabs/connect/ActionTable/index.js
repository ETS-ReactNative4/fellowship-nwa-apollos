import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  TableView,
  Cell,
  CellIcon,
  CellText,
  Divider,
  Touchable,
  styled,
  PaddedView,
  H4,
} from '@apollosproject/ui-kit';
import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';

const RowHeader = styled(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: theme.sizing.baseUnit,
}))(PaddedView);

const Name = styled({
  flexGrow: 1,
})(View);

const ActionTable = () => (
  <RockAuthedWebBrowser>
    {(openUrl) => (
      <View>
        <RowHeader>
          <Name>
            <H4>{'Connect with Fellowship'}</H4>
          </Name>
        </RowHeader>
        <TableView>
          <Touchable
            onPress={() => openUrl('https://www.fellowshipnwa.org/serve')}
          >
            <Cell>
              <CellText>Discover ways to Serve</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() => openUrl('https://www.fellowshipnwa.org/pray')}
          >
            <Cell>
              <CellText>Submit a Prayer</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() => openUrl('https://www.fellowshipnwa.org/baptism')}
          >
            <Cell>
              <CellText>Learn about Baptism</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          <Touchable onPress={() => openUrl('https://fellowshipnwa.org/care')}>
            <Cell>
              <CellText>Care & Counseling Center</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() => openUrl('https://www.fellowshipnwa.org/maps')}
          >
            <Cell>
              <CellText>Our Locations</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() =>
              openUrl('https://www.fellowshipnwa.org/staffdirectory')
            }
          >
            <Cell>
              <CellText>Contact Fellowship</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() => openUrl('https://www.fellowshipnwa.org/Home')}
          >
            <Cell>
              <CellText>Give Feedback</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Touchable
            onPress={() => openUrl('https://www.fellowshipnwa.org/Home')}
          >
            <Cell>
              <CellText>Report an Issue</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
        </TableView>
      </View>
    )}
  </RockAuthedWebBrowser>
);

const StyledActionTable = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 100,
}))(ActionTable);

export default StyledActionTable;
