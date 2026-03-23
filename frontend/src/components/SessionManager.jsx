/* Session Manager: tracks token expiration, shows warning, and handles auto-logout. */
import { useEffect, useState, useRef } from 'react';
import {
  getTokenExpiresInMs,
  isCurrentTokenExpired,
  refreshAccessToken,
  clearAccessToken,
  onAuthExpired,
} from '../api';
import Modal from './Modal';
import Alert from './Alerts';

const SESSION_WARNING_THRESHOLD_MS = 5 * 60 * 1000; // Warn 5 minutes before expiry

export default function SessionManager({ onLogout }) {
  const [showWarning, setShowWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [showExpiredAlert, setShowExpiredAlert] = useState(false);
  const [isExtending, setIsExtending] = useState(false);
  const [extendError, setExtendError] = useState('');

  const warningTimerRef = useRef(null);
  const expiryTimerRef = useRef(null);
  const updateTimerRef = useRef(null);

  function clearAllTimers() {
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
    if (updateTimerRef.current) clearInterval(updateTimerRef.current);
  }

  function formatTimeRemaining(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  }

  function setupSessionTimers() {
    clearAllTimers();

    const expiresInMs = getTokenExpiresInMs();

    if (expiresInMs === null || expiresInMs <= 0) {
      // Token already expired
      setShowExpiredAlert(true);
      return;
    }

    // Set warning timer (5 min before expiry)
    const timeUntilWarning = expiresInMs - SESSION_WARNING_THRESHOLD_MS;
    if (timeUntilWarning > 0) {
      warningTimerRef.current = setTimeout(() => {
        setShowWarning(true);
        setTimeRemaining(SESSION_WARNING_THRESHOLD_MS);

        // Update countdown every second
        updateTimerRef.current = setInterval(() => {
          setTimeRemaining((prev) => {
            const newTime = prev - 1000;
            return newTime > 0 ? newTime : 0;
          });
        }, 1000);
      }, timeUntilWarning);
    } else {
      // Less than 5 min left, show warning immediately
      setShowWarning(true);
      setTimeRemaining(expiresInMs);

      updateTimerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1000;
          return newTime > 0 ? newTime : 0;
        });
      }, 1000);
    }

    // Set expiry timer
    expiryTimerRef.current = setTimeout(() => {
      clearInterval(updateTimerRef.current);
      setShowWarning(false);
      setShowExpiredAlert(true);
    }, expiresInMs);
  }

  // Initialize session tracking on mount or when auth changes
  useEffect(() => {
    if (isCurrentTokenExpired()) {
      setShowExpiredAlert(true);
    } else {
      setupSessionTimers();
    }

    // Listen for auth expiration events from other tabs/windows
    const unsubscribe = onAuthExpired(() => {
      clearAllTimers();
      setShowWarning(false);
      setShowExpiredAlert(true);
    });

    return () => {
      clearAllTimers();
      unsubscribe();
    };
  }, []);

  async function handleExtendSession() {
    setIsExtending(true);
    setExtendError('');

    try {
      await refreshAccessToken();
      setShowWarning(false);
      setIsExtending(false);
      setupSessionTimers(); // Restart timers with new expiration
    } catch (error) {
      setExtendError(error.userMessage || 'Failed to extend session. Please log in again.');
      setIsExtending(false);
      // Don't close the dialog - let user try again or close manually
    }
  }

  function handleExpiredLogout() {
    clearAllTimers();
    clearAccessToken();
    setShowExpiredAlert(false);
    if (onLogout) onLogout();
	// nav to landing page and refresh to clear any protected data from memory
	navigate('/landing', { replace: true });
  }

  function handleWarningClose() {
    setShowWarning(false);
    clearAllTimers();
    clearAccessToken();
    if (onLogout) onLogout();
  }

  return (
    <>
      {/* Session Expiring Soon Warning */}
      <Modal isOpen={showWarning} onClose={handleWarningClose} clickOutsideClosable={false}>
        <div className="session-warning">
          <h2>Session Expiring Soon</h2>
          <p>Your session will expire in {formatTimeRemaining(timeRemaining)}.</p>
          <p className="caption">Click "Extend Session" to stay logged in, or "Logout" to end your session.</p>
          {extendError && <Alert type="error">{extendError}</Alert>}
          <div className="modal-actions">
            <button
              className="btn-primary"
              onClick={handleExtendSession}
              disabled={isExtending}
            >
              {isExtending ? 'Extending...' : 'Extend Session'}
            </button>
            <button
              className="btn-ghost"
              onClick={handleWarningClose}
              disabled={isExtending}
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>

      {/* Session Expired Alert */}
      <Modal isOpen={showExpiredAlert} onClose={handleExpiredLogout} clickOutsideClosable={false}>
        <div className="session-expired">
          <h2>Session Expired</h2>
          <p>Your session has expired due to inactivity. Please log in again to continue.</p>
          <button className="btn-primary" onClick={handleExpiredLogout}>
            Return to Login
          </button>
        </div>
      </Modal>
    </>
  );
}
