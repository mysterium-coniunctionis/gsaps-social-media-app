/* eslint-disable */
jest.mock('../api/auth', () => ({
  loginUser: jest.fn(),
  registerUser: jest.fn(),
  logoutUser: jest.fn(),
  getCurrentUser: jest.fn()
}));
jest.mock('../api/api', () => ({
  setUnauthorizedHandler: jest.fn()
}));
jest.mock('./AuthContext', () => {
  var user = { id: 'user-1' };
  var auth = { currentUser: user };
  return {
    useAuth: () => auth,
    AuthProvider: ({ children }) => children
  };
});
jest.mock('socket.io-client', () => {
  var s = {
    on: jest.fn(),
    emit: jest.fn(),
    timeout: jest.fn(),
    off: jest.fn(),
    removeAllListeners: jest.fn(),
    disconnect: jest.fn()
  };
  s.timeout.mockReturnValue(s);
  return { io: jest.fn(() => s), _socket: s };
});

var React = require('react');
var rtl = require('@testing-library/react');
require('@testing-library/jest-dom');
var RealtimeModule = require('./RealtimeContext');
var sioModule = require('socket.io-client');

var render = rtl.render;
var screen = rtl.screen;
var act = rtl.act;
var RealtimeProvider = RealtimeModule.RealtimeProvider;
var useRealtime = RealtimeModule.useRealtime;
var mockSocket = sioModule._socket;
var ioMock = sioModule.io;

function TestComponent(props) {
  var ctx = useRealtime();
  React.useEffect(function() {
    if (props.onContext) props.onContext(ctx);
  });
  return React.createElement('div', null,
    React.createElement('span', { 'data-testid': 'connected' }, String(ctx.isConnected)),
    React.createElement('span', { 'data-testid': 'feedUpdates' }, JSON.stringify(ctx.feedUpdates)),
    React.createElement('span', { 'data-testid': 'notifications' }, JSON.stringify(ctx.notifications))
  );
}

function SubscribeTestComponent() {
  var sub = useRealtime().subscribeToChannel;
  var cleanupRef = React.useRef(null);
  var handleSubscribe = function() {
    cleanupRef.current = sub('room-1', { message: jest.fn() }, { userId: 'user-1' });
  };
  var handleUnsubscribe = function() {
    if (cleanupRef.current) { cleanupRef.current(); cleanupRef.current = null; }
  };
  return React.createElement('div', null,
    React.createElement('button', { 'data-testid': 'subscribe-btn', onClick: handleSubscribe }, 'Sub'),
    React.createElement('button', { 'data-testid': 'unsubscribe-btn', onClick: handleUnsubscribe }, 'Unsub')
  );
}

function renderWithProvider(onContext) {
  return render(
    React.createElement(RealtimeProvider, null,
      React.createElement(TestComponent, { onContext: onContext })
    )
  );
}

function getSocketHandler(eventName) {
  var call = mockSocket.on.mock.calls.find(function(c) { return c[0] === eventName; });
  return call ? call[1] : undefined;
}

describe('RealtimeContext', function() {
  beforeEach(function() {
    // Re-set io mock implementation (resetMocks: true in CRA clears it)
    ioMock.mockReturnValue(mockSocket);
    mockSocket.timeout.mockReturnValue(mockSocket);
  });

  it('provides isConnected as false initially', function() {
    renderWithProvider();
    expect(screen.getByTestId('connected')).toHaveTextContent('false');
  });

  it('sets isConnected to true when socket emits connect', function() {
    renderWithProvider();
    var connectHandler = getSocketHandler('connect');
    expect(connectHandler).toBeDefined();
    act(function() { connectHandler(); });
    expect(screen.getByTestId('connected')).toHaveTextContent('true');
  });

  it('subscribeToChannel emits subscribe and registers handlers, cleanup unsubscribes', function() {
    render(
      React.createElement(RealtimeProvider, null,
        React.createElement(SubscribeTestComponent)
      )
    );
    act(function() { screen.getByTestId('subscribe-btn').click(); });
    expect(mockSocket.emit).toHaveBeenCalledWith('subscribe', { channel: 'room-1', userId: 'user-1' });
    expect(mockSocket.on).toHaveBeenCalledWith('room-1:message', expect.any(Function));
    act(function() { screen.getByTestId('unsubscribe-btn').click(); });
    expect(mockSocket.emit).toHaveBeenCalledWith('unsubscribe', { channel: 'room-1' });
    expect(mockSocket.off).toHaveBeenCalledWith('room-1:message', expect.any(Function));
  });

  it('sendTypingIndicator emits typing event', function() {
    var ctx;
    renderWithProvider(function(c) { ctx = c; });
    act(function() { ctx.sendTypingIndicator('room-1', true); });
    expect(mockSocket.emit).toHaveBeenCalledWith('typing', { roomId: 'room-1', isTyping: true });
  });

  it('updatePresence emits presence:update event', function() {
    var ctx;
    renderWithProvider(function(c) { ctx = c; });
    act(function() { ctx.updatePresence('room-1', 'away'); });
    expect(mockSocket.emit).toHaveBeenCalledWith('presence:update', { roomId: 'room-1', status: 'away' });
  });

  it('appends feed updates on feed:update socket event', function() {
    renderWithProvider();
    var feedHandler = getSocketHandler('feed:update');
    expect(feedHandler).toBeDefined();
    act(function() { feedHandler({ id: 'post-1', content: 'New post' }); });
    var feedUpdates = JSON.parse(screen.getByTestId('feedUpdates').textContent);
    expect(feedUpdates).toHaveLength(1);
    expect(feedUpdates[0].id).toBe('post-1');
  });

  it('appends notifications on notification:new socket event', function() {
    renderWithProvider();
    var notifHandler = getSocketHandler('notification:new');
    expect(notifHandler).toBeDefined();
    act(function() { notifHandler({ id: 'notif-1', message: 'You have a new follower' }); });
    var notifications = JSON.parse(screen.getByTestId('notifications').textContent);
    expect(notifications).toHaveLength(1);
    expect(notifications[0].id).toBe('notif-1');
  });
});
