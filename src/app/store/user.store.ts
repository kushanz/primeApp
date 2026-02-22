import { getState, patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { UserModel } from "../dto/user.model";
import { computed, inject } from "@angular/core";
import { UserService } from "../services/user.service";

type userState = {
  userList: UserModel[];
  loading: boolean;
}

const initialState: userState = {
  userList: [],
  loading: true,

}

export const userStore = signalStore(
  // { providedIn: 'root' },

  withState(initialState),

  withMethods((store) => ({
    getUserList() {
      const state = getState(store);
      return computed(() => state.userList);
    },
    setUserList(list: UserModel[]) {
      patchState(store, (state) => ({ ...state, userList: list, loading: false }))
    },
    addNewUser(user: UserModel) {
      patchState(store, (state) => ({ ...state, userList: [...state.userList, user]}))
    },
    removeUser(email: string) {
      patchState(store, (state) => ({ ...state, userList: state.userList.filter(u => u.email !== email)}))
    }
  })),
  withHooks({
    onInit: (store, userService = inject(UserService)) => {
      // userService.userResource.value$.subscribe(users => {
      //   store.setUserList(users);
      // })
    }
  })
)