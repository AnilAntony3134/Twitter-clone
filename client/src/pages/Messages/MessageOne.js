import React, { useEffect, useState, useRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import { editUser, deleteUser } from '../../store/actions/userActions';
import { loadMe } from '../../store/actions/authActions';
import Layout from '../../layout/Layout';
import Loader from '../../components/Loader/Loader';
import requireAuth from '../../hoc/requireAuth';
import ReactMarkdown from 'react-markdown'

import './styles.css';
import Solutionlist from '../../components/Solutions/Solutionlist';
import { getSingleMessage } from '../../store/actions/messageActions';
import { Avatar, Badge, Button, Grid, Navbar, Text } from '@nextui-org/react';
import Shortlisted from '../../components/Shortlisted/Shortlisted';
import { BsFillBackspaceFill } from 'react-icons/bs';
import SolutionForm from '../../components/MessageForm/SolutionForm';

const MessageOne = ({
    getSingleMessage,
    user: { profile, isLoading, error },
    message: { messages },
    auth: { me },
    editUser,
    deleteUser,
    loadMe,
    history,
    match,
}) => {
    console.log(messages)
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [tab, setTab] = useState(0);
    const retryCount = useRef(0);
    const matchMessageId = match.params.id;
    console.log(matchMessageId, 'messageId')

    useEffect(() => {
        getSingleMessage(matchMessageId);
    }, [matchMessageId]);

    // if changed his own username reload me, done in userActions

    const onChange = (event) => {
        formik.setFieldValue('image', event.currentTarget.files[0]);
        setImage(URL.createObjectURL(event.target.files[0]));
        setAvatar(event.target.files[0]);
    };

    const handleClickEdit = () => {
        retryCount.current = 0;
        setIsEdit((oldIsEdit) => !oldIsEdit);
        setImage(null);
        setAvatar(null);
        formik.setFieldValue('id', profile.id);
        formik.setFieldValue('name', profile.name);
        formik.setFieldValue('username', profile.username);
    };

    const handleDeleteUser = (id, history) => {
        deleteUser(id, history);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: '',
            name: '',
            username: '',
            password: '',
        },
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('avatar', avatar);
            formData.append('name', values.name);
            formData.append('username', values.username);
            if (profile.provider === 'email') {
                formData.append('password', values.password);
            }
            editUser(values.id, formData, history);
            //setIsEdit(false);
        },
    });

    console.log(me,'profileee')

    return (
        <Layout style={{ margin: '0px' }}>
            <div className="profile" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Link to='/'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <BsFillBackspaceFill />
                        <span style={{ marginLeft: '5px' }}> Back</span>
                    </div>
                </Link>
                <h1>{messages?.[0]?.title}</h1>
                <div style={{ display: 'flex', marginTop: '-25px', justifyContent: 'space-between' }}>
                    <Grid css={{ display: 'flex' }}>
                        <Grid css={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                                size="xl"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                color="primary"
                                bordered
                                squared
                            />

                        </Grid>
                        <Grid>
                            <p color='primary' size='$xl' weight="bold" style={{
                                color: 'var(--main)', fontWeight: '600', fontSize: '1.2rem', marginLeft: '10px', padding: '0'
                            }}>{messages?.[0]?.user?.name}</p>
                            <p color='primary' style={{ marginLeft: '10px', padding: '0', marginTop: '-15px' }}>{moment(messages?.[0]?.createdAt).fromNow()}</p>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Text>Difficulty: <Badge css={{ border: 'none' }} color={messages?.[0]?.difficulty === 'easy' ? 'success' : 'warning'}>{messages?.[0]?.difficulty.toUpperCase()}</Badge> </Text>
                    </Grid>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', backgroundColor: 'white', padding: '10px 20px', margin: '20px 0px', borderRadius: '10px', cursor: 'pointer' }}>
                        <div className={`tabs-messageOne-ind ${tab === 0 ? 'active-one' : ''}`} onClick={() => setTab(0)}>Overview</div>
                        <div className={`tabs-messageOne-ind ${tab === 1 ? 'active-one' : ''}`} onClick={() => setTab(1)}>{me?.organisation?.flag ? 'All Solutions' : 'Solution'}</div>
                        <div className={`tabs-messageOne-ind ${tab === 2 ? 'active-one' : ''}`} onClick={() => setTab(2)}>{me?.organisation?.flag ? 'Shortlisted' : 'Give Solution'}</div>
                    </div>
                </div>
                {
                    tab === 0 && (
                        <ReactMarkdown>
                            {messages?.[0]?.text}
                        </ReactMarkdown>
                    )
                }
                {
                    tab === 1 && (
                        <Solutionlist orgSolution={messages?.[0]?.id}/>
                    )
                }     {
                    tab === 2 && me?.organisation?.flag && (
                        <Shortlisted orgSolution={messages?.[0]?.id}/>
                    ) }
                    {
                    tab === 2 && !me?.organisation?.flag && (
                        <SolutionForm messageId={messages?.[0]?.id} setTab={setTab} />
                    )

                }
                {error && <p className="error">{error}</p>}
                {/* {(
                    
                ) : (
                    <>
                        <h1>Crisis List</h1>
                        <MessageList individual={true} uId={profile.id} />
                    </>
                )} */}
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
    auth: state.auth,
    message: state.message,
});

export default compose(
    requireAuth,
    withRouter,
    connect(mapStateToProps, { getSingleMessage, editUser, deleteUser, loadMe }),
)(MessageOne);
