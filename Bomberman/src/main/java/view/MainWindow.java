package view;
import javax.swing.*;
import java.awt.*;
import engine.ResourceLoader;
import static engine.Constants.*;

public class MainWindow extends JFrame {
    public MainWindow() {
        setTitle(MAIN_WINDOW_TITLE);
        setSize(MAIN_WINDOW_WIDTH, MAIN_WINDOW_HEIGHT);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);
        setLayout(new BorderLayout());

        // Title label with HTML and CSS for styling
        JLabel titleLabel = new JLabel("<html><div style='text-align: center; color: blue; font-size: 24px; font-family: Arial;'>BomberMan</div></html>");
        titleLabel.setHorizontalAlignment(JLabel.CENTER);
        add(titleLabel, BorderLayout.NORTH);

        // Create and add the instructions panel
        Instructions instructions = new Instructions();
        add(instructions, BorderLayout.CENTER);

        ImageIcon startButtonIcon = ResourceLoader.startButton;
        Image img = startButtonIcon.getImage();
        Image resizedImg = img.getScaledInstance(100, 50, java.awt.Image.SCALE_SMOOTH);
        startButtonIcon = new ImageIcon(resizedImg);

        JButton startButton = new JButton(startButtonIcon);
        startButton.setBorder(BorderFactory.createEmptyBorder());
        startButton.setContentAreaFilled(false);
        startButton.addActionListener(e -> System.out.println("START button clicked!"));

        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.CENTER));
        buttonPanel.add(startButton);
        add(buttonPanel, BorderLayout.SOUTH);

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
