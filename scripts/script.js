
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup');
const closeButton = popupEditProfile.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_name_name');
let jobInput = formElement.querySelector('.popup__input_name_job');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

function handleEditButton() {
    popupEditProfile.classList.add('popup_opened');
    //сюда надо дописать, что value поля ФОРМЫ ВВОДА = textContent соответствующего поля из profile
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

}

editButton.addEventListener('click', handleEditButton);

function handleCloseButton() {
    popupEditProfile.classList.remove('popup_opened');
}
closeButton.addEventListener('click', handleCloseButton);

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    handleCloseButton();
}
formElement.addEventListener('submit', handleFormSubmit);