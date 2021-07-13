import React from 'react';
import { ActionBar, ActionBarItem } from '@apollosproject/ui-kit';
import { useNavigation } from '@react-navigation/native';
import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';

const Toolbar = () => {
  const navigation = useNavigation();
  return (
    <>
      <RockAuthedWebBrowser>
        {(openUrl) => (
          <ActionBar>
            <ActionBarItem
              onPress={() =>
                openUrl('https://www.fellowshipnwa.org/SmallGroupForm')
              }
              icon="users-three"
              label="Join a Group"
            />
          </ActionBar>
        )}
      </RockAuthedWebBrowser>
      <RockAuthedWebBrowser>
        {(openUrl) => (
          <ActionBar>
            <ActionBarItem
              onPress={() => openUrl('https://www.fellowshipnwa.org/Home')}
              icon="phosphor-check"
              label="Check-in"
            />
            <ActionBarItem
              onPress={() => openUrl('https://www.fellowshipnwa.org/give')}
              icon="heart-straight"
              label="Give"
            />
            <ActionBarItem
              onPress={() => openUrl('https://www.fellowshipnwa.org/serve')}
              icon="hand-waving"
              label="Serve"
            />
          </ActionBar>
        )}
      </RockAuthedWebBrowser>
    </>
  );
};

export default Toolbar;
