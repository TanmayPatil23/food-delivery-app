import styled from "styled-components";
import { useContext, Fragment } from "react";
import AppContext from "../../context/app-context";
import useEditProfileForm from "../../hooks/useEditProfileForm";
import { LoaderSpinner } from "./../LoaderSpinner";
import {
  UserNameInput,
  UserLastNameInput,
  UserPasswordInput,
  UserNewPasswordInput,
  ErrorServerMessage,
  ErrorMessage,
} from "../auth/SingupForm";
import {
  OptionList,
  Option,
  CheckboxWrapper,
} from "../dashboard/CreateNewProductForm";
import { FormButtons } from "../dashboard/CreateNewProductForm";
import { NameInput } from "../contact/ContactForm";
import { GoBackLink } from "../product_details/ProductDetails";
import userEditIcone from "../../img/user-edit-solid.svg";

const EditProfilePage = styled.section`
  min-height: 100vh;
  width: 100vw;
  padding: 60px 0px;
  margin-left: -6px;
`;
const EditProfileForm = styled.form`
  max-width: 400px;
  width: 100%;
  padding: 50px 30px;
  border-radius: 10px;
  background: #fff;
  margin: 50px auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  & > input {
    border: none;
    background: #f0f0f0;
  }
  & > label {
    margin: 0 auto 20px;
  }
  & > ${OptionList} {
    min-width: 100%;
  }
`;
const FormIcone = styled.img`
  width: 120px;
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: -20px;
`;
const GoToProfileLink = styled(GoBackLink)`
  margin-left: 15px;
  &:before {
    content: "<-- ";
    margin-right: 3px;
  }
`;

function NewPasswordCheckbox({ setIsChangingPassword, value }) {
  return (
    <CheckboxWrapper>
      <label htmlFor="newPasswordCheckbox">Cambiar contraseña:</label>
      <input
        onChange={(e) => {
          setIsChangingPassword(!value);
        }}
        id="newPasswordCheckbox"
        type="checkbox"
        name="newPasswordCheckbox"
      />
    </CheckboxWrapper>
  );
}
function CellphoneInput({ register, errors, placeholder }) {
  return (
    <Fragment>
      {errors.userNumber && (
        <ErrorMessage role="alert">{errors.userNumber.message}</ErrorMessage>
      )}

      <NameInput
        placeholder={placeholder}
        name="userNumber"
        ref={register({
          required: "*This field is required",
          minLength: {
            value: 10,
            message: "*Invalid Phone Number",
          },
          maxLength: {
            value: 10,
            message: "*Invalid Phone Number",
          },
          pattern: {
            value: /[0-9]/,
            message: "*Enter only numbers",
          },
        })}
        style={{ borderColor: errors.userNumber && "#bf0000" }}
      />
    </Fragment>
  );
}
function CityAddressOptions({ register }) {
  return (
    <OptionList
      name="userCityAddress"
      ref={register({
        required: "*This field is required",
      })}
    >
      <Option value="Córdoba">Córdoba</Option>
    </OptionList>
  );
}
function StreetAddressInput({ errors, placeholder, register }) {
  return (
    <Fragment>
      {errors.userStreetAddress && (
        <ErrorMessage role="alert">
          {errors.userStreetAddress.message}
        </ErrorMessage>
      )}

      <NameInput
        placeholder={placeholder}
        name="userStreetAddress"
        ref={register({
          required: "*This field is required",
        })}
        style={{ borderColor: errors.userStreetAddress && "#bf0000" }}
      />
    </Fragment>
  );
}
function StreetNumberInput({ errors, placeholder, register }) {
  return (
    <Fragment>
      {errors.userStreetNumber && (
        <ErrorMessage role="alert">
          {errors.userStreetNumber.message}
        </ErrorMessage>
      )}

      <NameInput
        placeholder={placeholder}
        name="userStreetNumber"
        ref={register({
          required: "*This field is required",

          maxLength: {
            value: 4,
            message: "*Invalid Number",
          },
          pattern: {
            value: /[0-9]/,
            message: "*Enter numbers only",
          },
        })}
        style={{ borderColor: errors.userStreetNumber && "#bf0000" }}
      />
    </Fragment>
  );
}
export default function EditMyProfile() {
  const { token, setCurrentUser, setAllUsers, isAdmin, setIsSuccessfullySend } =
    useContext(AppContext);

  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    serverError,
    formIsLoading,
    isChangingPassword,
    setIsChangingPassword,
  } = useEditProfileForm({
    token,
    setCurrentUser,
    setAllUsers,
    setIsSuccessfullySend,
    isAdmin,
  });

  return (
    <EditProfilePage>
      <GoToProfileLink to="/myAccount/myProfile">Regresar</GoToProfileLink>

      <EditProfileForm onSubmit={handleSubmit(onSubmit)} novalidate>
        <FormIcone src={userEditIcone} alt="edit-profile" />
        <UserNameInput errors={errors} register={register} />
        <UserLastNameInput errors={errors} register={register} />
        <NewPasswordCheckbox
          setIsChangingPassword={setIsChangingPassword}
          value={isChangingPassword}
        />

        {isChangingPassword ? (
          <Fragment>
            <UserPasswordInput
              errors={errors}
              register={register}
              name="userPassword"
              placeholder="Old Password"
            />
            <UserNewPasswordInput
              errors={errors}
              register={register}
              name="newPassword"
              placeholder="New Password"
            />
          </Fragment>
        ) : null}

        <CellphoneInput
          errors={errors}
          register={register}
          placeholder="Telephone Number"
        />

        <CityAddressOptions register={register} />
        <StreetAddressInput
          errors={errors}
          register={register}
          placeholder="Address"
        />

        <StreetNumberInput
          errors={errors}
          register={register}
          placeholder="Street Number"
        />

        {formIsLoading ? (
          <LoaderSpinner small />
        ) : (
          <ErrorServerMessage>{serverError}</ErrorServerMessage>
        )}

        <FormButtons small />
      </EditProfileForm>
    </EditProfilePage>
  );
}
