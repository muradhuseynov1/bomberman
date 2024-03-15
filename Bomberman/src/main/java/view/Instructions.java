package view;

import javax.swing.*;
import java.awt.*;
import engine.ResourceLoader;

public class Instructions extends JPanel {

    private JButton toggleButton;
    private JPanel cardPanel;
    private CardLayout cardLayout;
    private boolean isExpanded;  // Track the state of the accordion

    public Instructions() {
        // Set the layout for the main panel
        setLayout(new BorderLayout());

        // Initialize the card layout and panel
        cardLayout = new CardLayout();
        cardPanel = new JPanel(cardLayout);

        // Content for the accordion section
        JLabel contentLabel = new JLabel("Content of Section 1");
        JPanel contentPanel = new JPanel(new BorderLayout());
        contentPanel.add(contentLabel, BorderLayout.CENTER);

        // Empty panel representing the collapsed state
        JPanel emptyPanel = new JPanel();

        // Add both panels to the card panel
        cardPanel.add(contentPanel, "Content");
        cardPanel.add(emptyPanel, "Empty");

        // Initialize the toggle button with the image
        ImageIcon instructionsImg = new ImageIcon(ResourceLoader.instructions.getImage().getScaledInstance(200, 100, Image.SCALE_SMOOTH));
        toggleButton = new JButton(instructionsImg);
        toggleButton.setBorder(BorderFactory.createEmptyBorder());
        toggleButton.setContentAreaFilled(false);

        // Toggle button switches between content and empty panel
        toggleButton.addActionListener(e -> {
            if (isExpanded) {
                cardLayout.show(cardPanel, "Empty");
            } else {
                cardLayout.show(cardPanel, "Content");
            }
            isExpanded = !isExpanded; // Toggle the state
        });

        // Add the toggle button and card panel to this panel
        add(toggleButton, BorderLayout.NORTH);
        add(cardPanel, BorderLayout.CENTER);

        // Initialize as collapsed
        isExpanded = false;
        cardLayout.show(cardPanel, "Empty");
    }
}
