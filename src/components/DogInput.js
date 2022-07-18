import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Auth';
import { collection, getDocs, doc, addDoc } from 'firebase/firestore';
import { db } from '../config/fbConfig';

// ------- ADD
