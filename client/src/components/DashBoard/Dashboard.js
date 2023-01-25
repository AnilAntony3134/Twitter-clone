import React, { useState } from 'react';
import { connect } from 'react-redux';
import MessageList from '../../components/MessageList/MessageList';
import MessageForm from '../../components/MessageForm/MessageForm';
import { MdOutlineEmojiFlags } from 'react-icons/md'
import { HiUsers } from 'react-icons/hi'
import { BsShieldFillCheck } from 'react-icons/bs'
import { Button, Modal } from '@nextui-org/react';
import ModalForm from '../Modal/Modal';

const Dashboard = ({ auth }) => {
    const [isaddMessage, setIsAddMessage] = useState(false);

    const closeHandler = () => setIsAddMessage(false);

    return (
        <>
            <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                    <h1>Dash<span style={{ color: '#4040d4' }}>Board</span></h1>
                    {
                        auth.me.organisation?.flag && (
                            <Button className='bg-indigo-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' style={{ width: '200px', backgroundColor: '#4040d4' }} onClick={() => setIsAddMessage(!isaddMessage)}>{isaddMessage ? 'Hide Write Message' : 'New Issue'}</Button>
                        )
                    }
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        Welcome <span className="name">{auth.me.name}</span>!
                    </div>
                </div>
            </>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={isaddMessage}
                onClose={closeHandler}
                width="40vw"
            >
                <ModalForm closeHandler={closeHandler}/>
            </Modal>
            <div style={{ display: 'flex', width: '100%', color: 'var(--bg)', justifyContent: 'space-between' }}>
                <div className='card_intro_wrapper' style={{ backgroundColor: 'rgb(83, 1, 190)' }}>
                    <div style={{ fontSize: '2.1rem' }}><MdOutlineEmojiFlags width="20px" /></div>
                    <p>Current Issues</p>
                    <h2>21</h2>
                </div>
                <div className='card_intro_wrapper' style={{ backgroundColor: 'rgb(141, 10, 141)' }}>
                    <div style={{ fontSize: '2.1rem' }}>
                        <BsShieldFillCheck />
                    </div>
                    <p>Solved Issues</p>
                    <h2>30</h2>
                </div>
                <div className='card_intro_wrapper'>
                    <div style={{ fontSize: '2.1rem' }}>
                        <HiUsers />
                    </div>
                    <p>Total Users</p>
                    <h2>12</h2>
                </div>
            </div>
            <h1 style={{ marginTop: '100px' }}><span style={{ color: '#4040d4' }}>Avaialble</span> Problems</h1>
            <MessageList />
        </>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

// export default compose(connect(mapStateToProps))(Dashboard);
export default connect(mapStateToProps)(Dashboard);

