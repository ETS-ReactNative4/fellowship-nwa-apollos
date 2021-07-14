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

const ActionTable = () => {
  const navigation = useNavigation();
  return (
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
                <CellText>Serve</CellText>
                <CellIcon name="arrow-next" />
              </Cell>
            </Touchable>
            <Divider />
            <Touchable
              onPress={() => openUrl('https://www.fellowshipnwa.org/Home')}
            >
              <Cell>
                <CellText>Contact us</CellText>
                <CellIcon name="arrow-next" />
              </Cell>
            </Touchable>
            <Divider />
            <Touchable
              onPress={() =>
                openUrl('https://www.fellowshipnwa.org/prayerrequest')
              }
            >
              <Cell>
                <CellText>I need prayer</CellText>
                <CellIcon name="arrow-next" />
              </Cell>
            </Touchable>
            <Divider />
            <Touchable
              onPress={() => openUrl('https://fellowshipnwa.org/baptism')}
            >
              <Cell>
                <CellText>Get baptized</CellText>
                <CellIcon name="arrow-next" />
              </Cell>
            </Touchable>
            <Divider />
            <Touchable
              onPress={() => openUrl('https://www.fellowshipnwa.org/Home')}
            >
              <Cell>
                <CellText>Get care</CellText>
                <CellIcon name="arrow-next" />
              </Cell>
            </Touchable>
            <Divider />
            <Touchable
              onPress={() => openUrl('https://www.fellowshipnwa.org/Home')}
            >
              <Cell>
                <CellText>Our locations</CellText>
                <CellIcon name="arrow-next" />
              </Cell>
            </Touchable>
            <Divider />
            <Touchable
              onPress={() => openUrl('https://www.fellowshipnwa.org/Home')}
            >
              <Cell>
                <CellText>Report an issue</CellText>
                <CellIcon name="arrow-next" />
              </Cell>
            </Touchable>
          </TableView>
        </View>
      )}
    </RockAuthedWebBrowser>
  );
};

const StyledActionTable = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 100,
}))(ActionTable);

export default StyledActionTable;
