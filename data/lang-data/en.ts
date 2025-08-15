export default {
    indexScreen: {
        paragraph: 'Immerse yourself in an endless adventure with ',

        button: 'Dive in ->',
    },
    signInScreen: {
        header: 'Sign in to ',

        emailPlaceholderText: 'Email...',
        passwordPlaceholderText: 'Password...',

        button: 'Sign In',

        text1: "Don't have an account yet? ",
        text2: 'Sign up.',

        errorMessage: 'Wrong e-mail or password.'
    },
    signUpScreen: {
        header1: 'Create your ',
        header2: '  account',

        emailPlaceholderText: 'Email...',
        usernamePlaceholderText: 'Username...',
        passwordPlaceholderText: 'Password...',

        button: 'Sign Up',

        text1: 'Already have an account? ',
        text2: 'Sign in.'
    },
    homeScreen: {
        header: "What’s new in ",        
        searchBarPlaceholderText: 'Search recipes...',

        text1: 'This is the end :('
    },
    createScreen: {
        header: 'Create something new with',

        titlePlaceholderText: 'Title...',
        descriptionPlaceholderText: 'Description...',
        ingredientsPlaceholderText: 'Ingredients (comma seperated)...',
        stepsPlaceholderText: 'Steps (comma seperated)...',
    },
    profileScreen: {
        text1: 'Joined ',
        text2: 'Recipes: ',
        text3: 'Likes: ',
        text4: 'Your recipes:',
        text5: '  recipes:',

        bottomText: 'This is the end :('
    },
    settingsScreen: {
        changePicText: 'Change profile pic',
        changeLanguageTxt: 'Change language',
        changeThemeTxt: 'Change theme',
        appInfoTxt: 'Application info',
    },
    favouritesScreen: {
        header1: 'Your favourite ',
        header2: ' recipes',

        header3: 'Your favourite ',
        header4: ' users',

        text1: 'This is the end :('
    },
    randomScreen:{
        text1: 'Find something random.',
        text2: "You don't have favourite recipes ;("
    },
    recipeScreen: {
        header1: ' users like this recipe.',
        header2: ' user likes this recipe.',

        text1: 'By ',
        text2: 'Created:',
        text3: 'Ingredients:',
        text4: 'Steps:',
        text5: 'Edited: ',
        text6: "Choose one of this author's recipe.",

        userNotFound: 'User removed',
    },
    editRecipeScreen:{
        header: 'Edit the recipe',
    },
    commentsScreen: {
        commentPlaceholderText: 'Comment...',
        text1: "Choose one of this author's recipe.",
    },
    commentCard:{
        text1: 'By ',
        text2: 'Created: ',

        userNotFound: 'User removed',
    },
    recipeCard:{
        text1: 'By ',
        text2: 'Created: ',
        text3: 'Ingredients:',

        userNotFound: 'User removed',
    },
    userCard:{
        text1: "Member since: ",
    },
    popupDefault:{
        buttonConfirm: "Yes",
        buttonNotConfirm: "No",
        buttonInfo: "Close"
    },
    //popup sign-up screen
    signUpFailPopup:{
        title: 'Error while creating account.',
        content: 'Error: '
    },
    signUpSuccessPopup:{
        title: 'Success.',
        content: 'Your account have been created. Log in to the app.'
    },
    //popups crate screen
    addingRecipePopup:{
        title: 'Confirm action.',
        content: 'Do You really want to add this recipe?'
    },
    notLoggedInPopup:{
        title: 'Upsss...',
        content: 'You are not logged in XD.'
    },
    addingRecipeError1Popup:{
        title: "Upss...!!!",
        content: 'Title and description is necessary.',
    },
    addinngRecipeSuccessPopup:{
        title: "Success!",
        content: 'Recipe has been added.',
    },
    addingRecipeError2Popup:{
        title: "Upss...!!!",
        content: 'There was an error while adding your recipe.',
    },
    errorWhileSavingRecipePopup:{
        title: "Error!",
        content: 'Err r ooooor whl  ee sav i nn gg',
    },
    //popups ProfileScreen
    loggingOutPopup:{
        title: 'Confirm action.',
        content: 'Do you really want to log out?',
    },
    //popups (recipe)contentScreen
    deleterecipePopup:{
        title: "Confirm action.",
        content: 'Do you really want to delete this recipe?',
    },
    deleteRecipeSuccess:{
        title: "Success!",
        content: "Your's recipe has been deleted.",
    },
    deleteRecipeError:{
        title: "Error!",
        content: "There was an error while removing your recipe.",
    },
    //popups (recipe)edit screen
    editRecipePopup:{
        title: "Confirm action",
        content: "Do you really want to edit this recipe?",
    },
    edittingRecipeSuccessPopup:{
        title: "Success!",
        content: 'Recipe has been editted.',
    },
    edittingRecipeErrorPopup:{
        title: "Error!",
        content: 'Error occured while editting recipe.',
    },
    //popups settings screen
    changeLanguagePopUp:{
        title: "Change language",
        content: "Change language for application.",
    },
    changeThemePopUp:{
        title: "Change Theme",
        content: "Change theme for application.",
    },
    changeAvatarPopUp:{
        title: "Change Avatar",
        content: "Pick the image.",

        button: "Pick",
    },
    appInformationsPopUp:{
        title: "AT-app v0.3",
        content: "Created by: Paweł Rycerz.",
    },
    //popups (recipe)commentsScreen
    validateCommentPopup:{
        title: "Upss...",
        content: "Comment can't be MT.",
    },
    //Themes
    themesText:[
        {name: 'Light', value: 'light'},
        {name: 'Dark', value: 'dark'},
        {name: 'Green', value: 'green'},
    ]
}
