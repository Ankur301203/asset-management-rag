INSERT INTO clients (name, relationship_manager, risk_appetite) VALUES
('Virat Kohli', 'Ramesh Gupta', 'High'),
('Alia Bhatt', 'Meera Shah', 'Moderate'),
('MS Dhoni', 'Ramesh Gupta', 'Low');

INSERT INTO portfolios (client_id, asset_name, asset_type, value) VALUES
(1, 'Reliance Equity Fund', 'Mutual Fund', 12000000),
(2, 'Tata Balanced Fund', 'Mutual Fund', 8000000),
(3, 'Gold ETF', 'ETF', 6000000);

INSERT INTO transactions (client_id, date, stock_symbol, quantity, price) VALUES
(1, '2024-06-01', 'RELI', 200, 2500.00),
(2, '2024-06-05', 'TCS', 150, 3500.00),
(3, '2024-06-10', 'HDFCBANK', 300, 1600.00);
