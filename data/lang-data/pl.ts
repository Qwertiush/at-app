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
        text2: 'Zarejestruj się.'
    },
    signUpScreen:{
        header1: 'Załóż swoje ',
        header2: '  konto',

        emailPlaceholderText: 'Email...',
        usernamePlaceholderText: 'Nazwa użytkownika...',
        passwordPlaceholderText: 'Hasło...',

        button: 'Zarejestruj się',

        text1: 'Masz już konto? ',
        text2: 'Zaloguj się.'
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
    },
    commentsScreen: {
        commentPlaceholderText: 'Napisz komentarz...',
    },
    commentCard:{
        text1: 'Napisał ',
        text2: 'Dodano: ',
    },
    recipeCard:{
        text1: 'Wykonał ',
        text2: 'Dodano: ',
        text3: 'Składniki:',
    },
    //popups crateScreen
    popupDefault:{
        buttonConfirm: "Tak",
        buttonNotConfirm: "Nie",
        buttonInfo: "Zamknij"
    },
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
    //Themes
    themesText:[
        {name: 'Jasny', value: 'light'},
        {name: 'Ciemny', value: 'dark'},
    ]
}