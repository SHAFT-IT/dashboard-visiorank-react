import { CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAILURE } from "../types/usercreate.type";
import { URL_USER_CREATE_UPDATE } from "../../commons/urls";
import { getData } from "../../commons/preferences";

export const createUsersBegin = () => ({
    type: CREATE_USER
  });
  
export const createUsersSuccess = usercreate => ({
    type: CREATE_USER_SUCCESS,
    payload: { usercreate }
});

export const createUsersFailure = error => ({
    type: CREATE_USER_FAILURE,
    payload: { error }
});
  
export function createUpdateUser(id, nom, prenom, societe, telephone, analytics, email, imap, password) {
    return dispatch => {

      getData('user')
      .then(user => {
        
          dispatch(createUsersBegin());
          fetch(`${URL_USER_CREATE_UPDATE}${user.mobile_token}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: id==0 ? JSON.stringify(
                { 
                    nom: nom,
                    prenom: prenom,
                    telephone: telephone,
                    analytics: analytics,
                    email: email,
                    imap: imap,
                    password: password, 
                    societe: societe
                }
            ) :

            JSON.stringify(
                { 
                    id: id,
                    nom: nom,
                    prenom: prenom,
                    telephone: telephone,
                    analytics: analytics,
                    email: email,
                    imap: imap,
                    password: password, 
                    societe: societe
                }
            )

          })
          .then((res) => res.json())
          .then(json => {
              console.log(`CREATE USER=======> ${JSON.stringify(json)}`);
              dispatch(createUsersSuccess(json));
          })
          .catch((e) => {
              // console.warn(e);
              dispatch(createUsersFailure(e));
          });

      })
      .catch(error => console.log('cannot get user preference'))

    };
}
  