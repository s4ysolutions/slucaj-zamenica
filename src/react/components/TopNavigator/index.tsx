/*
 * Copyright 2022 by s4y.solutions
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {useRef} from 'react';
import {AppBar, Box, IconButton, Toolbar, Typography} from '@mui/material';
import T from '../../../l10n';
import useObservable from '../../hooks/useObservable';
import {Route} from '../../../router';
import {map} from 'rxjs/operators';
import MenuIcon from '@mui/icons-material/Menu';
import {LessonStatistics} from '../../../tutor';
import usePromise from '../../hooks/usePromise';
import Statistics from './Statistics';
import MenuMain from './MenuMain';
import {getDi} from '../../../di/default';
import log from '../../../log';

const di = getDi();
const router = di.router;
const learningDb = di.learningDb;
const tutor = di.tutor;
const uiState = di.uiState;

const mr2 = {mr: 2};
const flexGrow1 = {flexGrow: 1};
const appTitle = T`App title`;


const handleMainMenuClick = () => {
  uiState.mainMenuOpen = !uiState.mainMenuOpen;
};

const getLessonStatisticsPromise = (): Promise<LessonStatistics> => learningDb.getLessonStatistics(tutor.currentLesson);

const NO_DATA = -1;

const TopNavigator: React.FunctionComponent = (): React.ReactElement => {
  log.render('TopNavigator');

  const menuOpen = useObservable<boolean>(uiState.observableMainMenuOpen, uiState.mainMenuOpen);

  const [currentLessonStatistic] = usePromise<LessonStatistics>(getLessonStatisticsPromise, {total: NO_DATA, wrong: 0});

  const routerTitle = useObservable(
    router.observableCurrentRoute.pipe(map((route: Route) => route.title)),
    router.currentRoute.title,
  );

  const mainMenuButtonRef = useRef<HTMLButtonElement>(null);

  return <Box sx={flexGrow1} >
    <AppBar position="static" >
      <Toolbar >
        <IconButton
          aria-controls={menuOpen ? 'main-menu' : undefined}
          aria-expanded={menuOpen ? 'true' : undefined}
          aria-haspopup="true"
          aria-label="menu"
          color="inherit"
          edge="start"
          id="main-menu-buton"
          onClick={handleMainMenuClick}
          ref={mainMenuButtonRef}
          size="large"
          sx={mr2}
        >
          <MenuIcon />
        </IconButton >

        <MenuMain anchorEl={mainMenuButtonRef.current} />

        <Typography component="h1" sx={flexGrow1} variant="h6" >
          {`${appTitle} - ${routerTitle}`}
        </Typography >

        {currentLessonStatistic.total !== NO_DATA && <Statistics initial={currentLessonStatistic} />}
      </Toolbar >
    </AppBar >
  </Box >;
};

export default TopNavigator;