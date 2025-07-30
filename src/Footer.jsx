import React from 'react'
import "./css/footer.css"


const footer = () => {
  return (
    <div className='footer'>
       <div className='items'>
        <p>Copyright &copy; {new Date().getFullYear()} by <span>Abbas</span>. All Rigths Reserved</p>
        <div className="payment">
         <img src="/src/assets/payment_right.png" alt="payment-cards" />
        <div className='scroll-up'></div>
        </div>
       </div> 
    </div>
  )
}

export default footer
