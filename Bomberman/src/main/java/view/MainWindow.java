package view;
import javax.swing.*;
import java.awt.*;
import engine.ResourceLoader;
import static engine.Constants.*;

public class MainWindow extends JFrame {

    // Custom panel with background image support
    class ImagePanel extends JPanel {
        private Image backgroundImage;

        public ImagePanel(Image image) {
            this.backgroundImage = image;
        }

        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            g.drawImage(backgroundImage, 0, 0, this.getWidth(), this.getHeight(), this);
        }
    }

    public MainWindow() {
        setTitle(MAIN_WINDOW_TITLE);
        setSize(MAIN_WINDOW_WIDTH, MAIN_WINDOW_HEIGHT);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);

        // Load the background image
        ImageIcon backgroundImageIcon = new ImageIcon(ResourceLoader.mainWindowBackground.getImage());
        ImagePanel backgroundPanel = new ImagePanel(backgroundImageIcon.getImage());
        setContentPane(backgroundPanel);
        setLayout(new BorderLayout());

        // Logo label at the top
        ImageIcon bombermanLogoIcon = new ImageIcon(ResourceLoader.bombermanLogo.getImage().getScaledInstance(200, 100, Image.SCALE_SMOOTH));
        JLabel logoLabel = new JLabel(bombermanLogoIcon);
        logoLabel.setHorizontalAlignment(JLabel.CENTER);
        add(logoLabel, BorderLayout.NORTH);

        // Instructions panel in the center
        JPanel centerPanel = new JPanel();
        centerPanel.setOpaque(false); // Make the panel transparent
        centerPanel.setLayout(new BoxLayout(centerPanel, BoxLayout.Y_AXIS));
        centerPanel.add(Box.createVerticalGlue()); // Pushes everything down
        Instructions instructions = new Instructions();
        centerPanel.add(instructions);
        add(centerPanel, BorderLayout.CENTER);

        // Start button at the bottom
        ImageIcon startButtonIcon = new ImageIcon(ResourceLoader.startButton.getImage().getScaledInstance(100, 50, Image.SCALE_SMOOTH));
        JButton startButton = new JButton(startButtonIcon);
        startButton.setBorder(BorderFactory.createEmptyBorder());
        startButton.setContentAreaFilled(false);
        startButton.addActionListener(e -> System.out.println("START button clicked!"));

        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.CENTER));
        buttonPanel.setOpaque(false); // Make the panel transparent
        buttonPanel.add(startButton);
        add(buttonPanel, BorderLayout.SOUTH);

        // Window closing event
        addWindowListener(new java.awt.event.WindowAdapter() {
            @Override
            public void windowClosing(java.awt.event.WindowEvent windowEvent) {
                int choice = JOptionPane.showConfirmDialog(MainWindow.this,
                        "Are you sure you want to exit the game? Your progress will not be saved.",
                        "Exit Game?", JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE);
                if (choice == JOptionPane.YES_OPTION) {
                    System.exit(0);
                } else {
                    setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
                }
            }
        });
    }
}
