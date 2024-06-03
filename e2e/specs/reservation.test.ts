describe('Reservation service tests', () => {
  let jwt: string;
  beforeAll(async () => {
    const user = {
      email: 'aws.dushi24@gmail.com',
      password: 'StrongPassword@123!',
    };

    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    jwt = await response.text();
  });

  test('Create and Get a Reservation', async () => {
    const response = await fetch('http://reservations:3000/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: jwt,
      },
      body: JSON.stringify({
        startDate: '12-15-2022',
        endDate: '12-19-2022',
        placeId: '12345',
        invoiceId: '333',
        charge: {
          amount: 9.9,
          card: {
            cvc: '123',
            exp_month: 12,
            exp_year: 2025,
            number: '4242 4242 4242 4242',
          },
        },
      }),
    });

    expect(response.ok).toBeTruthy();
    const reservation = await response.json();

    const responseGet = await fetch(
      `http://reservations:3000/reservations/${reservation._id}`,
      {
        headers: {
          Authentication: jwt,
        },
      },
    );

    const createdReservation: any = await responseGet.json();
    expect(reservation).toEqual(createdReservation);
  });
});
