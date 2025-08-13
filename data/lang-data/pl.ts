export default {
    indexScreen:{
        paragraph: 'Zanóż się w niekończąca się przygodę z ',

        button: 'Wejdź ->',
    },
    signInScreen:{
        header: 'Zaloguj się do ',

        emailPlaceholderText: 'Email...',
        passwordPlaceholderText: 'Hasło...',

        button: 'Zaloguj',

        text1: 'Nie masz jeszcze konta? ',
        text2: 'Zarejestruj się.',

        errorMessage: 'Błędny e-mail lub hasło.'
    },
    signUpScreen:{
        header1: 'Załóż swoje ',
        header2: '  konto',

        emailPlaceholderText: 'Email...',
        usernamePlaceholderText: 'Nazwa użytkownika...',
        passwordPlaceholderText: 'Hasło...',

        button: 'Zarejestruj się',

        text1: 'Masz już konto? ',
        text2: 'Zaloguj się.',
    },
    homeScreen: {
        header: 'Co nowego w ',        
        searchBarPlaceholderText: 'Szukaj przepisów...',

        text1: 'To już jest koniec :('
    },
    createScreen: {
        header: 'Stwórz coś nowego z',

        titlePlaceholderText: 'Tytuł...',
        descriptionPlaceholderText: 'Opis...',
        ingredientsPlaceholderText: 'Składniki (oddzielone przecinkami)...',
        stepsPlaceholderText: 'Kroki (oddzielone przecinkami) ...',
    },
    profileScreen: {
        text1: 'Dołączył ',
        text2: 'Przepisy: ',
        text3: 'Polubienia: ',
        text4: 'Twoje przepisy:',
        text5: '  przepisy:',
        
        bottomText: 'To już jest koniec :('
    },
    settingsScreen: {
        changePicText: 'Zmień zdjęcie profilowe',
        changeLanguageTxt: 'Zmień język',
        changeThemeTxt: 'Zmień motyw',
        appInfoTxt: 'Informacje o aplikacji',
    },
    favouritesScreen: {
        header1: 'Twoje ulubione ',
        header2: ' przepisy',

        text1: 'To już jest koniec :('
    },
    recipeScreen:{
        header1: ' użytkowników lubi ten przepis.',
        header2: ' użytkownik lubi ten przepis.',

        text1: 'Wykonał ',
        text2: 'Dodano: ',
        text3: 'Składniki:',
        text4: 'Kroki:',
        text5: 'Edytowano: ',

        userNotFound: 'Użytkownik usunięty',
    },
    editRecipeScreen:{
        header: 'Edytuj przepis',
    },
    commentsScreen: {
        commentPlaceholderText: 'Napisz komentarz...',
    },
    commentCard:{
        text1: 'Napisał ',
        text2: 'Dodano: ',

        userNotFound: 'Użytkownik usunięty',
    },
    recipeCard:{
        text1: 'Wykonał ',
        text2: 'Dodano: ',
        text3: 'Składniki:',

        userNotFound: 'Użytkownik usunięty',
    },
    userCard:{
        text1: "Dołączył: ",
    },
    popupDefault:{
        buttonConfirm: "Tak",
        buttonNotConfirm: "Nie",
        buttonInfo: "Zamknij"
    },
    //popup sign-up screen
    signUpFailPopup:{
        title: 'Błąd podczas zakładania konta.',
        content: 'Błąd: '
    },
    signUpSuccessPopup:{
        title: 'Sukces.',
        content: 'Twoje konto zostało założone. Zaloguj się do aplikacji.'
    },
    //popups crateScreen
    addingRecipePopup:{
        title: 'Zatwierdź akcję.',
        content: 'Czy na pewno chcesz dodać ten przepis?'
    },
    notLoggedInPopup:{
        title: 'Upsss...',
        content: 'Nie jesteś zalogowany XD.'
    },
    addingRecipeError1Popup:{
        title: "Upss...!!!",
        content: 'Pole "tytuł" i "opis" sa wymagane.',
    },
    addingRecipeError2Popup:{
        title: "Upss...!!!",
        content: 'Nastąpił problem podczas dodawania przepisu.',
    },
    addinngRecipeSuccessPopup:{
        title: "Sukces!",
        content: 'Przepis został dodany.',
    },
    errorWhileSavingRecipePopup:{
        title: "Błąd!",
        content: 'B ł    ąąą d podzzz zapsswniaaa.',
    },
    //popups ProfileScreen
    loggingOutPopup:{
        title: "Zatwierdź akcję.",
        content: 'Na pewno chcesz się wylogować?',
    },
    //popups (recipe)contentScreen
    deleterecipePopup:{
        title: "Zatwierdź akcję.",
        content: 'Na pewno chcesz usunąć przepis?',
    },
    deleteRecipeSuccess:{
        title: "Sukces!",
        content: 'Twój przepis został usunięty.',
    },
    deleteRecipeError:{
        title: "Error!",
        content: "Nastąpił problem podczas usuwaia przepisu.",
    },
    //popups (recipe)edit screen
    editRecipePopup:{
        title: "Zatwierdź akcję",
        content: "Czy na pewno chcesz edytować ten przepis?",
    },
        edittingRecipeSuccessPopup:{
        title: "Sukces!",
        content: 'Przepis został edytowany.',
    },
    edittingRecipeErrorPopup:{
        title: "Error!",
        content: 'Nastąpił problem przy edytowaniu przepisu.',
    },
    //popups settings screen
    changeLanguagePopUp:{
        title: "Zmień język",
        content: "Wybierz język aplikacji.",
    },
    changeThemePopUp:{
        title: "Zmień motyw",
        content: "Zmień motyw aplikacji.",
    },
    changeAvatarPopUp:{
        title: "Zmień zdjęcie profilowe",
        content: "Wybierz zdjęcie.",

        button: "Wybierz"
    },
    appInformationsPopUp:{
        title: "AT app 1.0",
        content: "Twórca: Paweł Rycerz.",
    },
    //popups (recipe)commentsScreen
    validateCommentPopup:{
        title: "Upss...",
        content: "Komentarz nie może być pusty.",
    },
    //Themes
    themesText:[
        {name: 'Jasny', value: 'light'},
        {name: 'Ciemny', value: 'dark'},
        {name: 'Zieleń', value: 'green'},
    ]
}