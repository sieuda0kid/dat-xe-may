const footerStyle = {
  footer: {
    fontFamily: 'Roboto',
    backgroundColor: '#3c3d41',
    color: 'White',
    paddingTop: 30,
    margin: 0 -8,
    marginTop: 100,
  },
  logo: {
    fontSize: 50,
    textAlign: 'center',
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',  
    justifyContent:'center', 
    alignItems:'center',
  },
  footerCopyright: {
  backgroundColor: '#333333',
    paddingTop: 3,
    paddingBottom: 3,
    textAlign: 'center',
    marginTop: 20,
  },
  social_networks: {
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 16,
  
  },
  social_networks_twitter: {
    fontSize: 32,
    color: '#f9f9f9',
    padding: 10,
    transition: '0.2s',
    '&:hover': {
      color: '#00aced',
    },   
  },

  social_networks_google: {
    fontSize: 32,
    color: '#f9f9f9',
    padding: 10,
    transition: '0.2s',
    '&:hover': {
      color: '#0077e2',
      
    },   
  },


  social_networks_facebook: {
    fontSize: 32,
    color: '#f9f9f9',
    padding: 10,
    transition: '0.2s',
    '&:hover': {
      color: '#ef1a1a',
    },   
  }, 

  Button: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    width: 150,
  },

  a: {
    textDecoration: 'none',
    color: '#d2d1d1',
    display: 'flex',  
    justifyContent:'center', 
    alignItems:'center',
    '&:hover' : {
      color: 'White'
    },
  },
  ul: {
    listStyleType: 'none',
    paddingLeft: 0,
    lineHeight: 1.7,
    marginTop: -15,
  },
  h5: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 30,
    display: 'flex',  
    justifyContent:'center', 
    alignItems:'center',
  },
  
};
export default footerStyle;
