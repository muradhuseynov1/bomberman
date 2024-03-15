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
        // Ensure this panel is transparent
        setOpaque(false);
        setLayout(new BorderLayout());

        // Initialize the card layout and panel, make it transparent
        cardLayout = new CardLayout();
        cardPanel = new JPanel(cardLayout);
        cardPanel.setOpaque(false); // Make the card panel transparent

        // Content for the accordion section
        JLabel contentLabel = new JLabel("Content of Section 1");
        JPanel contentPanel = new JPanel(new BorderLayout());
        contentPanel.setOpaque(false); // Make the content panel transparent
        contentPanel.add(contentLabel, BorderLayout.CENTER);

        // Empty panel representing the collapsed state, make it transparent
        JPanel emptyPanel = new JPanel();
        emptyPanel.setOpaque(false);

        // Add both panels to the card panel
        cardPanel.add(contentPanel, "Content");
        cardPanel.add(emptyPanel, "Empty");

        // Initialize the toggle button with the image
        ImageIcon instructionsImg = new ImageIcon(ResourceLoader.instructions.getImage().getScaledInstance(200, 100, Image.SCALE_SMOOTH));
        toggleButton = new JButton(instructionsImg);
        toggleButton.setBorder(BorderFactory.createEmptyBorder());
        toggleButton.setContentAreaFilled(false);
        toggleButton.setOpaque(false); // Make the toggle button transparent

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
