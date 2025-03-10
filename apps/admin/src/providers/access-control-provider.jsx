/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {useAuthContext} from '@asgardeo/auth-react';
import {useEffect, useState} from 'react';
import {fetchLoggedInUserProfile} from '../api/self-service';
import AccessControlContext from '../contexts/access-control-context';

const AccessControlProvider = ({children}) => {
  const {state, signIn, on, trySignInSilently} = useAuthContext();
  const {isAuthenticated, isLoading} = state;

  const [accessControl, setAccessControl] = useState({
    dashboard: false,
    devices: false,
    services: false,
    promotions: false,
  });

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      signIn();
    }
  }, [isAuthenticated, isLoading, signIn]);

  useEffect(() => {
    on('sign-in', res => {
      // FIXME: `internal_login` is not working.
      // fetchLoggedInUserProfile();
      resolveAccessControl();
    });
  }, [on]);

  useEffect(() => {
    (async () => {
      try {
        const response = await trySignInSilently();
    
        if (response) {
          resolveAccessControl();
        }
      } catch (e) {
        signIn();
      }
    })();
  }, []);

  const resolveAccessControl = () => {
    // FIXME: Temp hard code.
    setAccessControl({
      dashboard: true,
      devices: true,
      services: true,
      promotions: true,
    });
  };

  return <AccessControlContext.Provider value={{access: accessControl}}>{children}</AccessControlContext.Provider>;
};

export default AccessControlProvider;
