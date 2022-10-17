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

import {DefaultPersonalPronounsDb} from '../tutor/pronouns-personal/default';
import indexedDbFactory from '../kv/promise/indexedDB';
import {DefaultTutor} from '../tutor/tutor/default';
import {InterrogativePronounsDb, LearningDb, LessonsDb, NounsDb, Tutor} from '../tutor';
import {KvPromiseLearningDb} from '../tutor/learned/kv-promise-db';
import {DefaultRouter} from '../router/default';
import {Router} from '../router';
import {DefaultUiState} from '../ui-state/default';
import {UiState} from '../ui-state';
import {Di} from './index';
import {DefaultInterrogativePronounsDb} from '../tutor/personal-interrogative/default';
import {DefaultLessonsDb} from '../tutor/lessons/default';


class DefaultDi implements Di {
  private readonly _promiseKV = indexedDbFactory('sluchaj-zamenica');

  private readonly _personalPronounsDb = new DefaultPersonalPronounsDb();

  private readonly _interrogativePersonalPronounsDb = new DefaultInterrogativePronounsDb();

  private readonly _lessons = new DefaultLessonsDb();

  private readonly _learningDb = new KvPromiseLearningDb(this._promiseKV, this._lessons);

  private readonly _tutor = new DefaultTutor(
    this._personalPronounsDb,
    this._interrogativePersonalPronounsDb,
    this._learningDb,
    this._lessons,
  );

  private readonly _router = new DefaultRouter();

  private readonly _uiState = new DefaultUiState();

  get learningDb (): LearningDb {
    return this._learningDb;
  }

  get personPronounsDb (): NounsDb {
    return this._personalPronounsDb;
  }

  get interrogativePronounsDb (): InterrogativePronounsDb {
    return this._interrogativePersonalPronounsDb;
  }

  get router (): Router {
    return this._router;
  }

  get lessons (): LessonsDb {
    return this._lessons;
  }

  get tutor (): Tutor {
    return this._tutor;
  }

  get uiState (): UiState {
    return this._uiState;
  }

}

const singletonDi = new DefaultDi();

export const getDi = (): Di => singletonDi;
