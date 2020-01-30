import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import { authModule } from 'modules'
import { consultationModule } from 'modules'
import { chatModule } from 'modules'
import { conclusionModule } from 'modules'
import { videoModule } from 'modules'
import { pastConsultationsModule } from 'modules'

import { IAuthState } from 'modules/auth/types'
import { IChatState } from 'modules/chat/types'
import { IConsultationState } from 'modules/consultation/types'
import { IVideoState } from 'modules/video/types'
import { IConclusionState } from 'modules/conclusion/types'
import { IPastConsultationsState } from 'modules/pastConsultations/types'

export interface IState {
  auth: IAuthState
  consultation: IConsultationState
  chat: IChatState
  video: IVideoState
  conclusion: IConclusionState
  pastConsultations: IPastConsultationsState
}

export default (history: History) => combineReducers<IState>({
  router: connectRouter(history),

  auth: authModule.reducer,
  consultation: consultationModule.reducer,
  chat: chatModule.reducer,
  video: videoModule.reducer,
  conclusion: conclusionModule.reducer,
  pastConsultations: pastConsultationsModule.reducer,
})
