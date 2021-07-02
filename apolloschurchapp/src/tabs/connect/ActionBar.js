import React from 'react';
import { ActionBar, ActionBarItem } from '@apollosproject/ui-kit';
import { useNavigation } from '@react-navigation/native';
import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';

const Toolbar = () => {
  const navigation = useNavigation();
  return (
    <RockAuthedWebBrowser>
      {(openUrl) => (
        <ActionBar>
          <ActionBarItem
            onPress={() => openUrl('https://www.fellowshipnwa.org/Home')}
            icon="check"
            label="Check-in"
          />
          <ActionBarItem
            onPress={() => openUrl('https://www.fellowshipnwa.org/give')}
            icon="download"
            label="Give"
          />
          <ActionBarItem
            onPress={() => openUrl('https://www.fellowshipnwa.org/serve')}
            icon="groups"
            label="Volunteer"
          />
        </ActionBar>
      )}
    </RockAuthedWebBrowser>
  );
};

export default Toolbar;
